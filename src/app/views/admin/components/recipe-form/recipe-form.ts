import { TitleCasePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Recipe } from '../../../../shared/services/recipe';
import { recipe } from '../../../../shared/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule, FormsModule, TitleCasePipe],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss',
})
export class RecipeForm {
  private recipeService = inject(Recipe);
  private formBuilder = inject(FormBuilder);
  checkboxList = viewChildren<ElementRef<HTMLInputElement>>('momentCheckbox');

  createRecipeForm = this.formBuilder.group({
    pictureUrl: this.formBuilder.control(''),
    name: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    infos: this.formBuilder.control(''),
    moment: this.formBuilder.array<('matin' | 'midi' | 'soir')[]>(
      [],
      Validators.required
    ),
    ingredients: this.formBuilder.array([], Validators.required),
    insulins: this.formBuilder.array([], Validators.required),
  });

  newIngredient = signal('');

  get nameControl() {
    return this.createRecipeForm.get('name') as FormControl;
  }
  get moment(): FormArray {
    return this.createRecipeForm.get('moment') as FormArray;
  }

  get ingredients(): FormArray {
    return this.createRecipeForm.get('ingredients') as FormArray;
  }

  get insulins(): FormArray {
    return this.createRecipeForm.get('insulins') as FormArray;
  }

  onMomentChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (input.checked) {
      if (!this.moment.value.includes(value)) {
        this.moment.push(this.formBuilder.control(value));
      }
    } else {
      const index = this.moment.controls.findIndex((c) => c.value === value);
      if (index > -1) this.moment.removeAt(index);
    }

    console.log('moment value:', this.moment.value);
  }

  addIngredient() {
    this.ingredients.push(
      this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      })
    );
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addInsulin() {
    this.insulins.push(
      this.formBuilder.group({
        name: this.formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        units: this.formBuilder.control(0, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(0.5)],
        }),
      })
    );
  }

  deleteInsulin(index: number) {
    this.insulins.removeAt(index);
  }

  async submit() {
    // console.log('Form recipe:', this.createRecipeForm.value);
    const formValue = this.createRecipeForm.getRawValue() as recipe;
    this.recipeService.addRecipe(formValue);

    // Clear:
    this.createRecipeForm.reset({
      pictureUrl: '',
      name: '',
      infos: '',
    });
    (this.createRecipeForm.get('moment') as FormArray).clear();
    (this.createRecipeForm.get('ingredients') as FormArray).clear();
    (this.createRecipeForm.get('insulins') as FormArray).clear();
    const checkboxes = this.checkboxList();
    checkboxes.forEach((checkbox) => {
      checkbox.nativeElement.checked = false;
    });
  }
}

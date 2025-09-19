import { TitleCasePipe } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnChanges,
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
import { Recipe as RecipeService } from '../../../../shared/services/recipe';
import { recipe } from '../../../../shared/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule, FormsModule, TitleCasePipe],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss',
})
export class RecipeForm {
  private recipeService = inject(RecipeService);
  private formBuilder = inject(FormBuilder);
  checkboxList = viewChildren<ElementRef<HTMLInputElement>>('momentCheckbox');
  getRecipe = input<recipe>();
  recipeList = this.recipeService.recipes();

  createRecipeForm = this.formBuilder.group({
    _id: this.formBuilder.control(this.getRecipe()?._id || null),
    pictureUrl: this.formBuilder.control(this.getRecipe()?.pictureUrl || ''),
    name: this.formBuilder.control(this.getRecipe()?.name || '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    infos: this.formBuilder.control(''),
    moment: this.formBuilder.array<('matin' | 'midi' | 'soir')[]>(
      [],
      Validators.required
    ),
    ingredients: this.formBuilder.array([], Validators.required),
    insulins: this.formBuilder.array<FormGroup>([], Validators.required),
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

  clearForm() {
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

  async submit() {
    const formValue = this.createRecipeForm.getRawValue() as recipe;
    console.log('formValue:', formValue);
    // vérifier si _id existe et correspond à une recette existante
    const existingRecipe = this.recipeList.find((recipe) => {
      console.log('list:', this.recipeList);
      console.log('Comparing:', recipe._id, 'with', formValue._id);
      return recipe._id === formValue._id;
    });

    if (existingRecipe) {
      console.log('update Recipe');
      this.recipeService.updateRecipe(formValue);
    } else {
      console.log('Add new Recipe');
      this.recipeService.addRecipe(formValue);
    }
  }

  private patchForm(targetRecipe: recipe) {
    this.clearForm();
    const checkboxes = this.checkboxList();

    this.createRecipeForm.patchValue({
      _id: targetRecipe._id,
      pictureUrl: targetRecipe.pictureUrl || '',
      name: targetRecipe.name,
      infos: targetRecipe.infos || '',
    });

    targetRecipe.moment.forEach((m) =>
      this.moment.push(this.formBuilder.control(m))
    );
    checkboxes.forEach((checkbox) => {
      checkbox.nativeElement.checked = targetRecipe.moment.includes(
        checkbox.nativeElement.value as 'matin' | 'midi' | 'soir'
      );
    });

    targetRecipe.ingredients.forEach((ingredient) =>
      this.ingredients.push(
        this.formBuilder.control(ingredient, Validators.required)
      )
    );

    const insulinGroups = targetRecipe.insulins.map((insulin, index) =>
      this.formBuilder.group({
        name: [insulin.name, Validators.required],
        units: [insulin.units, [Validators.required, Validators.min(0.5)]],
      })
    );
    this.createRecipeForm.setControl(
      'insulins',
      this.formBuilder.array(insulinGroups)
    );

    // Close form:
    
  }

  constructor() {
    effect(() => {
      const recipe = this.getRecipe();
      if (recipe) {
        // console.log('Patching form with recipe:', recipe);
        this.patchForm(recipe);
      }
    });
  }
}

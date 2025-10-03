import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ThemePalette } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import {
  Color,
  MAT_COLOR_FORMATS,
  MatColorFormats,
  NgxMatColorPickerComponent,
  NgxMatColorPickerInput,
  NgxMatColorToggleComponent,
} from '@ngxmc/color-picker';

const CUSTOM_MAT_COLOR_FORMATS: MatColorFormats = {
  display: {
    colorInput: 'hex8',
  },
};

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.html',
  styleUrls: ['./color-picker.scss'],
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    NgxMatColorPickerComponent,
    NgxMatColorPickerComponent,
    NgxMatColorPickerInput,
    NgxMatColorToggleComponent,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: CUSTOM_MAT_COLOR_FORMATS },
  ],
})
export class ColorPicker {
  // Contrib component, don't touch that:
  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;

  colorCtr = new FormControl(new Color(0, 0, 0), [Validators.required]);

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
  ];

  public listColors = ['primary', 'accent', 'warn'];

  onDisabledChanged(value: boolean) {
    if (!value) {
      this.colorCtr.enable();
    } else {
      this.colorCtr.disable();
    }
  }

  // Customization Component:
  @Output() colorChanged = new EventEmitter<Color>();

  constructor() {
    // Emit changed color
    this.colorCtr.valueChanges.subscribe((color: Color | null) => {
      if (color) {
        this.colorChanged.emit(color);
      }
    });
    // Emit default color
    const initialColor = this.colorCtr.value;
    if (initialColor) {
      this.colorChanged.emit(initialColor);
    }
  }
}

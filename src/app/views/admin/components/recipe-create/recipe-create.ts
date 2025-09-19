import { Component } from '@angular/core';
import { RecipeForm } from "../recipe-form/recipe-form";
import { SubMenu } from "../../../sub-menu/sub-menu";

@Component({
  selector: 'app-recipe-create',
  imports: [RecipeForm, SubMenu],
  templateUrl: './recipe-create.html',
  styleUrl: './recipe-create.scss'
})
export class RecipeCreate {

}

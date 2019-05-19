import { Recipe } from './recipe.model';
//import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.module';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService {

  recipesChanged =new Subject<Recipe[]>();
  // recipeSelected=new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
    'A super-tasty Schnitzel - just awesome', 
    'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    [
      new Ingredient('Meat',1),
      new Ingredient('French Fries',20)
    ]),
    new Recipe('Big fat Burger', 
    'What else you need to say?', 
    'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    [
      new Ingredient('Buns',2),
      new Ingredient('Meat',1)
    ])
  ];
  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes :Recipe[]){
    this.recipes=recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
   getRecipes()
   {
     return this.recipes.slice();
   }

   getRecipe(index :number)
   {
     return this.recipes[index];
   }

   addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
   }

   updateRecipe(index : number, newRecipe : Recipe){
     this.recipes[index]=newRecipe;
     this.recipesChanged.next(this.recipes.slice());
   }
   deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

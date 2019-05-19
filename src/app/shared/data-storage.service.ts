import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, 
    private recipeService: RecipeService,
    private authService :AuthService) {}

  storeRecipes() {
    return this.http.put('https://my-recipe-book-89822.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();
    this.http.get('https://my-recipe-book-89822.firebaseio.com/recipes.jsonauth=' + token)
      .pipe(map(
        (recipes : Recipe[]) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          console.log(recipes);
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}

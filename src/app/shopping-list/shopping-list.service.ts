import { Ingredient } from '../shared/ingredient.module';
//import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
  //constructor() { }
  //ingridentsChanged=new EventEmitter<Ingredient[]>();
  ingridentsChanged=new Subject<Ingredient[]>();
  startedEditing=new Subject<number>();

private  ingredients:Ingredient[]=[
    new Ingredient('Apples',5),
    new Ingredient('Tomamtos',10)];

    getIngridents()
    {
      return this.ingredients.slice();
    }
    
   getIngrident(index :number)
   {
   return this.ingredients[index];
   }


   addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingridentsChanged.next(this.ingredients.slice());
  }
    addIngrident(ingrident:Ingredient)
    {
      this.ingredients.push(ingrident);
      console.log(ingrident.name);
//      this.ingridentsChanged.emit(this.ingredients.slice());
     this.ingridentsChanged.next(this.ingredients.slice());  
   }
   


   updateIngrident(index :number, newIngrident : Ingredient){
     this.ingredients[index]=newIngrident;
     this.ingridentsChanged.next(this.ingredients.slice());
   }

   deleteingrident(index :number){
      this.ingredients.splice(index,1);
      this.ingridentsChanged.next(this.ingredients.slice());
   }

}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.module';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
//import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  private subscription :Subscription;
   editMode=false;
  private editedItemIndex :number;
  private editedItem :Ingredient;
  @ViewChild('f') slForm :NgForm;

  constructor(private slService:ShoppingListService) { }
  onSubmit(form : NgForm)
  {
     const ingredient=new Ingredient(form.value.name,form.value.amount);   

     if(this.editMode){
       this.slService.updateIngrident(this.editedItemIndex,ingredient)
     }else{
      this.slService.addIngrident(ingredient);
     }
     this.editMode=false;
     form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    
      this.slService.deleteingrident(this.editedItemIndex);
      this.onClear();
  }


  ngOnInit() {
   this.subscription= this.slService.startedEditing
    .subscribe((index:number)=>{
      console.log(index);
      this.editedItemIndex=index;
         this.editMode=true;
         this.editedItem=this.slService.getIngrident(index);
         this.slForm.setValue({
          name :this.editedItem.name,
          amount : this.editedItem.amount
         }
         );
    }
    );
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
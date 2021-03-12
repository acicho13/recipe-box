import { Component, OnInit } from "@angular/core";
import { IRecipe } from "../recipe";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"],
})
export class RecipeListComponent implements OnInit {
  errorMessage: string;
  recipes: IRecipe[] = [];
  searchInput: string ='';
  recipesCopy = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getSheetData().subscribe({
      next: (recipes) => {
        this.recipes = recipes
        this.recipesCopy = [...recipes];
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  fetchResults(event: any) {

    if (event.target.value === '') {
      this.recipes = this.recipesCopy;
      return this.recipes;
    }
    this.recipes = this.recipesCopy.filter((recipe) => {
      return recipe.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
  }

}

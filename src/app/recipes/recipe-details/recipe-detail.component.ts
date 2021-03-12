import { Component, OnInit } from "@angular/core";
import { IRecipe } from "../recipe";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"],
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  name: string;
  ingredients: any;
  directions: any;
  errorMessage: string;
  recipe: IRecipe[] = [];

  message: string;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.recipeService.getSheetData().subscribe({
      next: (recipes) => {
        this.recipe = recipes;
        this.name = this.recipe[this.id].name;
        if (this.recipe[this.id].ingredients){
          this.ingredients = this.recipe[this.id].ingredients.split(';');
        }
        if(this.recipe[this.id].directions) {
          this.directions = this.recipe[this.id].directions.split(';');
        }
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}



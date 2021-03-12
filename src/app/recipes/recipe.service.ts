import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IRecipe } from "./recipe";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  data: any =null;
  private sheetId = '1Dt4Pw_kNqE640A4ByB_PFeUqDLO4_7tJghr4foc3ifE';
  private  url = `https://spreadsheets.google.com/feeds/list/${this.sheetId}/od6/public/values?alt=json`;


  constructor(private http: HttpClient) {}

  public getSheetData(): Observable<IRecipe[]> {
    return this.http.get(this.url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry.sort((a, b) => (a.name > b.name) ? 1 : -1);
          const returnArray: Array<any> = [];
          if (data && data.length > 0) {
            data.forEach(entry => {
              const obj = {};
              for (const x in entry) {
                if (x.includes('gsx$') && entry[x].$t) {
                  obj[x.split('$')[1]] = entry[x]['$t'];
                }
              }
              returnArray.push(obj);
            });
          }
          return returnArray;
        })
      );
  }

  // getRecipes(): Observable<IRecipe[]> {
  //   return this.http.get<IRecipe[]>(this.recipeUrl).pipe(
  //     tap((data) =>  JSON.stringify(data)),
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(err: HttpErrorResponse) {
    //in a real world app, we may send the server to some remote logging infrastructure
    //instead of just logging it to the console
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      //A client-side or network error occured. Handle it accordingly
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

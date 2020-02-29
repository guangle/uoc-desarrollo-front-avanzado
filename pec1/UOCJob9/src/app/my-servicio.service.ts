import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
//import { HttpClientModule } from "@angular/common/http";

//import "rxjs/add/operator/toPromise";

@Injectable({
  providedIn: "root"
})
export class MyServicioService {
  private heroesUrl = "api/heroes"; // URL to web api
  constructor(private http: HttpClient) {}
  getHeroes(): Promise<Hero[]> {
    return (
      this.http
        .get(this.heroesUrl)
        .toPromise()
        //.then(response => response.json().data)
        .then(response => response)
        .catch(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

export class Hero {}

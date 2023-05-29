import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

const token = sessionStorage.getItem("token");
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Bearer " + token, // replace with your token
  }),
};

@Injectable({ providedIn: "root" })
export class StrategyService {
  API = environment.API;
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  }

  //strategy functions
  public getStrategy(): Observable<any> {
    return this.http.get(`${this.API}/strategy/fetch`, httpOptions);
  }
  public getMyStrategy(id): Observable<any> {
    return this.http.get(`${this.API}/strategy/fetch/${id}`, httpOptions);
  }
  public addStrategy(data): Observable<any> {
    return this.http.post(`${this.API}/strategy/add`, data, httpOptions);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
import { Project } from '../models/project';

const token = sessionStorage.getItem('token');
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token // replace with your token
  })
};

@Injectable({providedIn: 'root'})

export class ProjectService { 

API = environment.API;
httpHeaders: HttpHeaders;

constructor(private http: HttpClient, private router: Router) {
  this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
}

public registerProject(data: Project):Observable<any>{
    return this.http.post(`${this.API}/project/register-project`,data, httpOptions);
}

}

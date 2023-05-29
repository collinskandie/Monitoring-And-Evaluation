import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Email, OTP} from '../models/auth';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
// import {ConfigService} from '../../common/configs.service';
// import { Notification } from './../../models/notification';
// import { SidenavItem } from '../../../core/layout/sidenav/sidenav-item/sidenav-item.interface';
import { environment } from '../../environments/environment';
const token = sessionStorage.getItem('token');
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token // replace with your token
  })
};

@Injectable({providedIn: 'root'}) 

export class UserService { 

API = environment.API;

loggedin = false;
redirecturl: string;
users: User[] = [];
isuserupdated = false;
httpHeaders: HttpHeaders;

private token: string;
private email : string;
private userId : string;



constructor(private http: HttpClient, private router: Router) {
  this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
}

private saveEmail(email: string): void {
    sessionStorage.setItem('email', email);
    this.email = email;
}
private saveToken(token: string): void {
    sessionStorage.setItem('token', token);
    this.token = token;
}
private saveUserId(userId: string): void {
    sessionStorage.setItem('userId', userId);
    this.userId = userId;
}
public getToken(): string {
  if (!this.token) {
      this.token = sessionStorage.getItem('token');
  }
  return this.token;
}
public adddUsers(user){
  return this.http.post(`${this.API}/users/addUser`,user,httpOptions);
}
public updateUser(updateUser){ 
  return this.http.post(`${this.API}/users/updateUser`,updateUser,httpOptions);
}
//get users list
public fetchUsers():Observable<any>{
  return this.http.get(`${this.API}/users/fetch`, httpOptions);
}
public deleteUser(id: string): Observable<any> {
  return this.http.delete(`${this.API}/users/delete/${id}`, httpOptions);
}


//get the details of a user by ID
public getUserById(id:string):Observable<any>{
  return this.http.get(`${this.API}/users/getuserbyid/${id}`,httpOptions)
}

// used
public getUserDetails(): User {
    const token = this.getToken();
    let payload;
    if (token) {
        payload = token.split('.')[1];
        payload = window.atob(payload);
        return JSON.parse(payload);
    } else {
        return null;
    }
}
public getUsersByType() {

}
// used
public getUsersByRole(role): Observable<any> {
  return this.http.post(`${this.API}/users/fetchusersbyrole`, {role: role}, {headers: this.httpHeaders});
}

 public sendOtp(email: Email): Observable<any> {
    console.log('are we there yet')
    return this.http.post(`${this.API}/auth/login`, email, {headers: this.httpHeaders}).pipe(map((data: TokenResponse) => {
        console.log('we here')
        if (data.type == 'success') {

            this.saveUserId(data.data.userId)
           
            return data;
        }
        return data;
    }));
}

public verifyOTP(otp: OTP): Observable<any> {
    console.log('check')
    console.log(otp)
    return this.http.post(`${this.API}/auth/otpverification`, otp, {headers: this.httpHeaders}).pipe(map((data: TokenResponse) => {
        console.log('checked')
        if (data.type === 'success') {
            this.saveToken(data.data.token);
           
            this.loggedin = true;
           
        }
        return data;
        
    }));
}


public register(user: User): Observable<any> {
    return this.http.post(`${this.API}/register`, user, {headers: this.httpHeaders, params: {
      user: (this.getUserDetails() ? this.getUserDetails().email : null)
    }});
}

public profile(): Observable<any> {
      return this.http.get(`${this.API}/profile`, {headers: {Authorization: `Bearer ${this.getToken()}`}});
}


}

export interface TokenResponse {
type: string,
message: string,
data: {
    token: string,
    userId: string
}
}

export interface ApiResponse {
status: boolean;
code: any;
message: any;
}




// used
// used
// public fetchUserByCode(code: string): Observable<User> {
//     return of(JSON.parse(localStorage.getItem('users'))).pipe(map(users => users.find(user => user.code === code)));
// }
// public logout(): void {
//     this.token = '';
//     window.sessionStorage.removeItem('token');
//     window.sessionStorage.removeItem('district');
//     window.sessionStorage.removeItem('village');
//     window.sessionStorage.removeItem('dashboardstats');
//     this.router.navigateByUrl('/');
//     console.log(window.sessionStorage);
//   } 
  // used
  // public fetchPaginatedUsers(pageSize, pageIndex, partner?): Observable<any> {
  //   if (partner) {
  //     return this.http.get(`${this.API}/users/fetchusers`, {params: {size: pageSize, index: pageIndex,
  //        email: this.getUserDetails().email, partner: partner}});
  //   } else {
  //   return this.http.get(`${this.API}/users/fetchusers`, {params: {size: pageSize, index: pageIndex, email: this.getUserDetails().email}});
  //   }
  // }
  
  // public fetchUsersMails(pageSize, pageIndex, partner?): Observable<any> {
  //   if (partner) {
  //     return this.http.get(`${this.API}/users/fetchuserMails`, {params: {size: pageSize, index: pageIndex,
  //        email: this.getUserDetails().email, partner: partner}});
  //   } else {
  //   return this.http.get(`${this.API}/users/fetchuserMails`, {params: {size: pageSize, index: pageIndex,
  //     email: this.getUserDetails().email}});
  //   }
  // }
  // used
  // public updateUser(user: User): Observable<any> {
  //   return this.http.post(`${this.API}/users/update?email=${this.getUserDetails().email}`, user, {headers: this.httpHeaders});
  // }
  // used
//   public fetchUserByActivateRoute(activeRoute: string): Observable<any> {
//     return this.http.get(`${this.API}/users/fetchusersbyactivatelink`, {params: {activateLink: activeRoute}});

//   }
//   // used
//   public fetchUserByEmail(email: string): Observable<any> {
//     return this.http.post(`${this.API}/users/fetchUserByEmail`, {email: email},
//       {headers: this.httpHeaders});
//   }
//   // used
//   public fetchUserByPartner(partner?): Observable<any> {
//     return this.http.get(`${this.API}/users/fetchUserByPartner`, {params: {partner: partner ? partner : '',
//     email: this.getUserDetails().email}, headers: this.httpHeaders});
//   }
//   // used
//   public activateUser(activateData): Observable<any> {
//     // tslint:disable-next-line: max-line-length
//     // return this.http.post(`${this.API}/activate`, activateData, {headers: this.httpHeaders, params: {email: this.getUserDetails().email}});
//     return this.http.post(`${this.API}/activate`, activateData, {headers: this.httpHeaders, params: {email: activateData.email}});

//   }
//   // used
//   public createUserGroup(usergroup): Observable<any> {
//     return this.http.post(`${this.API}/accesscontrol/newaccessgroup`, {usergroup: usergroup}, {headers: this.httpHeaders,
//       params: {email: this.getUserDetails().email}});
//   }
// //   // used
// //   public fetchUserGroupByRole(): Observable<any> {
// //     return this.http.post(`${this.API}/accesscontrol/fetchaccessgroupbyrole`, {role: this.getUserDetails().group},
// //                           {headers: this.httpHeaders, params: {email: this.getUserDetails().email}});
// //   }
//   // used
//   public getUserGroupByRole(group): Observable<any> {
//     // tslint:disable-next-line: max-line-length
//     return this.http.get(`${this.API}/accesscontrol/getaccessgroupbyrole`, {params: {role: group, email: this.getUserDetails().email}, headers: this.httpHeaders});
//   }

//   public fetchAllAccessGroups(): Observable<any> {
//     return this.http.get(`${this.API}/accesscontrol/getallaccessgroups?email=${this.getUserDetails().email}`);
//   }
//   // getaccessgroupsbypartner
//   public fetchAccessGroupsForPartner(partner): Observable<any> {
//     return this.http.get(`${this.API}/accesscontrol/getallaccessgroups`, {params : {partner: partner,
//       email: this.getUserDetails().email}});
//   }
//   public fetchNotificationByUSer(): Observable<any> {
//     return this.http.post(`${this.API}/users/fetchnotificationbymail`, {email: this.getUserDetails().email},
//     {headers: this.httpHeaders});
//   }
//   // used
//   public fetchUsersToApprove(pageSize, pageIndex, partner?): Observable<any> {
//     if (partner) {
//       return this.http.get(`${this.API}/users/fetchinactiveusers`, {headers: this.httpHeaders,
//       params: {size: pageSize, index: pageIndex, partner: partner, email: this.getUserDetails().email}});
//     } else {
//     return this.http.get(`${this.API}/users/fetchinactiveusers`, {headers: this.httpHeaders,
//     params: {size: pageSize, index: pageIndex, email: this.getUserDetails().email}});
//     }
//   }

//   public approve(user): Observable<any> {
//     return this.http.post(`${this.API}/approve`, user, {headers: this.httpHeaders, params: {email: this.getUserDetails().email}});
//   }
//   public reject(user): Observable<any> {
//     return this.http.post(`${this.API}/reject`, user, {headers: this.httpHeaders, params: {email: this.getUserDetails().email}});
//   }
//   public forgotPassword(email): Observable<any> {
//     return this.http.get(`${this.API}/forgotpassword`, {params: {email}, headers: this.httpHeaders});
//   }
//   public validateResetPasswordCode(payload): Observable<any> {
//     return this.http.post(`${this.API}/validateResetPasswordCode`,payload, {headers: this.httpHeaders});
//   }
//   public changePassword(payload): Observable<any> {
//     return this.http.post(`${this.API}/changepassword`, payload, { headers: this.httpHeaders});
//   }


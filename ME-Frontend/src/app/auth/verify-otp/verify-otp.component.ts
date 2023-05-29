import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import {
  NB_AUTH_OPTIONS,
  NbAuthService,
  NbLoginComponent,
} from "@nebular/auth";

import { UserService } from "../../services/user-service";
import { MessagingService } from "../../services/messaging-service";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { Email } from "../../models/auth";

interface userDetails {
  otp: string,
  userId: string
}

@Component({
  selector: "ngx-login",
  templateUrl: "./verify-otp.component.html",
})
export class VerifyOTP extends NbLoginComponent {
  constructor(
    private userService: UserService,
    private messagingService: MessagingService,
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    cd: ChangeDetectorRef,
    router: Router
  ) {
    super(service, options, cd, router);
  }

  getUserId(){
    console.log(localStorage.getItem('userId'))
    return sessionStorage.getItem('userId')
  }
 
  

  userDetails: userDetails;

  verifyOTP() {
   
    this.userDetails = {
      otp: this.user.password,
      userId: this.getUserId()
    };

    console.log(this.userDetails);
    this.userService.verifyOTP(this.userDetails).subscribe(data => {
        console.log(data)
        if (data.type === 'success') {
            console.log('Hurray')
            this.showMessages.error = false;
            this.showMessages.success = true;
            this.messages = [data.message];
            this.router.navigate(['/pages']);
        } else {
            this.errors = [data.message]
        }
      });
  }
}

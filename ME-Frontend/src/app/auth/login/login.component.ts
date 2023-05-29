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
  email: "";
}

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent extends NbLoginComponent {
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

  error: string


  userDetails: userDetails;

  login() {
    console.log("button clicked");
    this.userDetails = {
      email: this.user.email,
    };
    console.log(this.userDetails);
    this.userService.sendOtp(this.userDetails).subscribe(data => {
      if (data.type === 'success') {
        console.log('Hurray')
        this.router.navigate(['/auth/verify-otp']);
      } else {
        this.showMessages.errors = true;
        this.errors = [data.message]
      }
    });
  }
}

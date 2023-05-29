
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from "@angular/router";
import * as i0 from "@angular/core";
import {
  NB_AUTH_OPTIONS,
  NbRegisterComponent,
  NbAuthService,
  NbAuthSocialLink
} from '@nebular/auth';
import { UserService } from '../../@core/mock/users.service';
interface userDetails {
  email: "";
}
@Component({
  exportAs: 'ngModel',
  selector: 'nb-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',

})


export class RegisterComponent extends NbRegisterComponent {
  constructor(
    private userService: UserService,
    service: NbAuthService,
   
    @Inject(NB_AUTH_OPTIONS) options: {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
  ) {
    super(service, options, cd, router);
    
  }


  // error: string
  userDetails: userDetails;
  register() {
    console.log("register button clicked");
    console.log(this.userDetails);
    // this.userService.sendOtp(this.userDetails).subscribe(data => {
    //   if (data.type === 'success') {
    //     console.log('Hurray')
    //     this.router.navigate(['/auth/verify-otp']);
    //   } else {
    //     this.showMessages.errors = true;
    //     this.errors = [data.message]
    //   }
    // });

  };
  // getConfigValue(key: string): any;
  static ɵfac: i0.ɵɵFactoryDeclaration<NbRegisterComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<NbRegisterComponent, "nb-register", never, {}, {}, never, never, false>;

}



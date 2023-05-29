import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user-service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  @Input() user: any;
  showEditForm = true;



  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: NbToastrService

  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  updateUser() {
    if (this.userForm.invalid) {
      return;
    }
    const userId = this.user._id;   
    const newDetails = this.userForm.value;
    console.log(newDetails);
    const userData= { ...newDetails, id:userId};
    console.log(userData);   
    this.userService.updateUser(userData).subscribe(() => {
      // this.userForm.reset();
      this.toastrService.show('User edited successfully', 'Success');
    });
    // reload the page to show users 
    setTimeout(() => {
      window.location.reload();
    }, 1000); // Wait for 1 second before refreshing the page
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../../services/user-service';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;

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

  addNewUser() {
    if (this.userForm.invalid) {
      return;
    }
    const newUser = this.userForm.value;
    this.userService.adddUsers(newUser).subscribe(() => {
      this.userForm.reset();
      this.toastrService.show('User added successfully', 'Success');
    });
  }
}

import { StrategyService } from './../../../services/strategy-service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { UserService } from "../../../services/user-service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-add-strategy',
  templateUrl: './add-strategy.component.html',
  styleUrls: ['./add-strategy.component.scss']
})
export class AddStrategyComponent implements OnInit {
  userForm: FormGroup;
  userName = "";
  userId ="";


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private strategyService: StrategyService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.userService
      .getUserById(sessionStorage.getItem("userId"))
      .subscribe((data) => {
        this.userName = data.userName;
        this.userId= sessionStorage.getItem("userId");
      });
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required,]]
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const newStrategy = {
      ...this.userForm.value,
      createdBy: this.userName,
      createdById: this.userId
    };
    this.strategyService.addStrategy(newStrategy).subscribe(() => {
      this.userForm.reset();
      this.toastrService.show('Strategy added successfully', 'Success');
      this.router.navigate(['/strategy']);
    });
  }
}

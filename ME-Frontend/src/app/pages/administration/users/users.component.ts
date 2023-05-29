import { messages } from './../../extra-components/chat/messages';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { User } from '../../../models/user';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

})
export class UsersComponent implements OnInit {

  users: any = [];
  showForm = false;
  showEditForm = false;
  selectedUser: User | null = null;
  messages: null;

  constructor(private userService: UserService, 
    private toastrService: NbToastrService
  ) { }
  ngOnInit() {
    this.userService.fetchUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => console.log(error)
    );
  }
  showAddUserForm() {
    this.showForm = !this.showForm;
  }
  showEditUserForm(user: User) {
    console.log(user);
    this.showEditForm = !this.showEditForm;
    this.selectedUser = user;
  }
  deleteUser(id) {
    console.log(id);
    this.userService.deleteUser(id).subscribe(
      (response) => {
        console.log(response);
        this.toastrService.show('User deleted', 'Danger');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => console.log(error)
    );

  }
}

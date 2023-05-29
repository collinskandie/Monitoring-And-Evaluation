import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AccessControlComponent } from "./access-control/access-control.component";
import { UserGroupsComponent } from "./user-groups/user-groups.component";
import { UsersComponent } from "./users/users.component";
import { AdministrationComponent } from "./administration.component";

const routes: Routes = [
  {
    path: "",
    component: AdministrationComponent,
    children: [
      {
        path: "users",
        component: UsersComponent,
      },
      {
        path: "user-groups",
        component: UserGroupsComponent,
      },
      {
        path: "access-control",
        component: AccessControlComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}

export const routedComponents = [
  AdministrationComponent,
  AccessControlComponent,
  UserGroupsComponent,
  UsersComponent,
];

import { Component, OnInit } from "@angular/core";

import { FormGroup, FormControl } from "@angular/forms";

import { UserService } from "../../../../services/user-service";
import { ProjectService } from "../../../../services/project-service";
import { Project } from "../../../../models/project";

import {
  NbToastrService,
  NbComponentStatus,
  NbDialogRef,
} from "@nebular/theme";

@Component({
  selector: "ngx-register-new-project",
  templateUrl: "./register-new-project.component.html",
  styleUrls: ["./register-new-project.component.scss"],
})
export class RegisterNewProjectComponent implements OnInit {
  projectData: FormGroup;
  strategy = "";
  userName = "";
  userId = "";

  private index: number = 0;

  newProjectData: Project = {
    name: "",
    strategy: "",
    startDate: "",
    endDate: "",
    createdBy: "",
    createdById: ""
  };

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<RegisterNewProjectComponent>
  ) {
    this.userService
      .getUserById(sessionStorage.getItem("userId"))
      .subscribe((data) => {
        this.userName = data.userName;        
      });
      this.userId = sessionStorage.getItem("userId");
  }

  ngOnInit() {
    this.projectData = new FormGroup({
      name: new FormControl(""),
      startDate: new FormControl(""),
      endDate: new FormControl(""),
    });
  }

  selectedStrategy(strategy: string) {
    this.strategy = strategy;
    console.log("we here");
    console.log(strategy);
  }

  onSubmit(data: Project) {
    this.newProjectData = {
      name: data.name,
      strategy: this.strategy,
      startDate: data.startDate,
      endDate: data.endDate,
      createdBy: this.userName,
      createdById: this.userId,
    };
    console.log(this.newProjectData);

    //post the data
    this.projectService
      .registerProject(this.newProjectData)
      .subscribe((data) => {
        this.ref.close(data);
      });
  }
}

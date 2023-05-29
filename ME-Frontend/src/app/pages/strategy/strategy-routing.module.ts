import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StrategiesComponent } from "./strategies/strategies.component";
import { ProjectsComponent } from "./projects/projects.component";
import { MyProjectsComponent } from "./my-projects/my-projects.component";
import { StrategyComponent } from "./strategy.component";
import { ProjectDetailComponent } from "./projects/project-detail/project-detail.component";
import { DetailsComponent } from "./projects/project-detail/details/details.component";

const routes: Routes = [
  {
    path: "",
    component: StrategyComponent,
    children: [
      {
        path: "strategies",
        component: StrategiesComponent,
      },
      {
        path: "projects",
        children: [
          {
            path: '',
            component: ProjectsComponent,
          },
          {
            path: "project-details/:id",
            children: [
              {
                path: '',
                component: ProjectDetailComponent,
              },
              {
                path: 'details',
                component: DetailsComponent,
              }
            ]
          },
        ],
      },
      {
        path: "my-projects",
        children: [
          {
            path: '',
            component: MyProjectsComponent,
          },
          {
            path: "project-details/:id",
            children: [
              {
                path: '',
                component: ProjectDetailComponent,
              },
              {
                path: 'details',
                component: DetailsComponent,
              }
            ]
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StrategyRoutingModule { }

export const routedComponents = [
  StrategiesComponent,
  ProjectsComponent,
  MyProjectsComponent,
  StrategyComponent,
];

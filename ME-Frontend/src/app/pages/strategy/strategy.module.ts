import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  StrategyRoutingModule,
  routedComponents,
} from "./strategy-routing.module";
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRouteTabsetModule,
  NbTableModule,
  NbTabsetModule,
  NbTreeGridModule,
} from "@nebular/theme";
import { RegisterNewProjectComponent } from "./projects/register-new-project/register-new-project.component";
import { NbAutocompleteStrategiesComponent } from "./projects/nb-autocomplete-strategies/nb-autocomplete-strategies.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddStrategyComponent } from "./add-strategy/add-strategy.component";
import { SuccessToasterComponent } from "./projects/success-toaster/success-toaster.component";
import { BrowserModule } from "@angular/platform-browser";
import { ProjectDetailComponent } from "./projects/project-detail/project-detail.component";
import { DetailsComponent } from "./projects/project-detail/details/details.component";
import { BudgetChartComponent } from "./projects/project-detail/details/budget-chart/budget-chart.component";

import { NgxEchartsModule } from "ngx-echarts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { SitesComponent } from './projects/project-detail/sites/sites.component';
import { BubbleMapComponent } from './projects/project-detail/sites/bubble-map/bubble-map.component';

@NgModule({
  declarations: [
    ...routedComponents,
    RegisterNewProjectComponent,
    NbAutocompleteStrategiesComponent,
    AddStrategyComponent,
    SuccessToasterComponent,

    ProjectDetailComponent,
    DetailsComponent,
    BudgetChartComponent,
    SitesComponent,
    BubbleMapComponent,
    
  ],
  imports: [
    CommonModule,
    NbCardModule,
    StrategyRoutingModule,
    NbTreeGridModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbDatepickerModule,
    NbAutocompleteModule,
    NbRouteTabsetModule, 
    ReactiveFormsModule,
    FormsModule,
    NbTabsetModule,
    NgxEchartsModule,
    NgxChartsModule
  ],
})
export class StrategyModule {}

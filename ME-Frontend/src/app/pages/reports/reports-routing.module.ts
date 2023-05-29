import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { StrategyReportComponent } from './strategy-report/strategy-report.component';
import { ChampionReportComponent } from './champion-report/champion-report.component';
import { QuartelyReportComponent } from './quartely-report/quartely-report.component';
import { WeeklyReportComponent } from './weekly-report/weekly-report.component';

const routes: Routes = [
  {
    path: '',
    component : ReportsComponent,
    children : [
      {
        path : 'strategy-report',
        component : StrategyReportComponent
      },
      {
        path : 'champion-report',
        component : ChampionReportComponent
      },
      {
        path : 'quartely-report',
        component : QuartelyReportComponent
      },
      {
        path : 'weekly-report',
        component : WeeklyReportComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

export const routedComponents = [
    ReportsComponent,
    ChampionReportComponent,
    QuartelyReportComponent,
    StrategyReportComponent,
    WeeklyReportComponent
]

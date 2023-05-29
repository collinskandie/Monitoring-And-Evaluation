import { NbToastrService } from '@nebular/theme';
import { StrategyService } from '../../../services/strategy-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-strategies',
  templateUrl: './strategies.component.html',
  styleUrls: ['./strategies.component.scss']
})
export class StrategiesComponent implements OnInit {

  strategies: any;
  showAddForm = false;
  constructor(private strategyService: StrategyService,
    private toastrService: NbToastrService) {

  }

  ngOnInit(): void {
    this.strategyService.getStrategy().subscribe(
      (response) => {
        this.strategies = response;
      },
      (error) => console.log(error)
    );
  }
  showStrategyForm() {
    this.showAddForm = !this.showAddForm;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { StrategyService } from "../../../../services/strategy-service";

interface Strategy {
  strategy: string;
}

@Component({
  selector: "ngx-nb-autocomplete-strategies",
  templateUrl: "./nb-autocomplete-strategies.component.html",
  styleUrls: ["./nb-autocomplete-strategies.component.scss"],
})
export class NbAutocompleteStrategiesComponent implements OnInit {
  options: string[];
  filteredOptions$: Observable<string[]>;

  selectedStrategy: FormGroup;

  constructor(
    private strategyService: StrategyService
  ){


    this.selectedStrategy = new FormGroup({
      strategy: new FormControl(""),
    });

  }

  @ViewChild("autoInput") input;

  // @Input() strategy = ""; // decorate the property with @Input()
  @Output() newSelectedStrategyEvent = new EventEmitter<string>();

  ngOnInit() {

    this.strategyService.getStrategy().subscribe(stragies => {

      let stratData: string[];
      stratData = stragies.map(strategy =>{
        return strategy.name
      })

      this.options = stratData;
      this.filteredOptions$ = of(this.options);

    })


  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) =>
      optionValue.toLowerCase().includes(filterValue)
    );
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(map((filterString) => this.filter(filterString)));
  }

  onChange() {


    this.filteredOptions$ = this.getFilteredOptions(
      this.input.nativeElement.value
    );
    this.newSelectedStrategyEvent.emit(this.selectedStrategy.value.strategy)
    console.log(this.selectedStrategy.value.strategy);

  }

  onSelectionChange($event) {


    this.filteredOptions$ = this.getFilteredOptions($event);
    console.log(this.selectedStrategy.value.strategy)
    console.log(this.selectedStrategy.value.strategy);
    this.newSelectedStrategyEvent.emit(this.selectedStrategy.value.strategy)


  }

}

import { Component, HostBinding, Input } from "@angular/core";
import { NbToastrService, NbComponentStatus } from "@nebular/theme";

@Component({
  selector: "ngx-success-toaster",
  template: `
    <p (click)="showToast('control')">
      Control
    </p>
  `,
  styles: [
    `
      ::ng-deep nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class SuccessToasterComponent {
 


  private index: number = 0;

  constructor(private toastrService: NbToastrService) {}



  showToast(status: NbComponentStatus) {
    this.toastrService.show(status, `Toast: ${++this.index}`, { status });
  }

}

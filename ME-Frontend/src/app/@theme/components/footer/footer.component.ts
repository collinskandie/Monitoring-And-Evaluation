import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created by <b><a href="https://renga.tech" target="_blank">Renga Technologies Limited</a></b> 2023
    </span>
    <div class="socials">
      <a href="https://github.com/Renga-Technologies-Ltd" target="_blank" class="ion ion-social-github"></a>      
      <a href="https://twitter.com/RengaLtd" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/company/rengatechnologies/mycompany/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}

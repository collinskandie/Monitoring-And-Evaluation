import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule, routedComponents } from './administration-routing.module';
import { NbButtonModule, NbCardModule,NbFormFieldModule,NbInputModule,NbListModule, NbSelectLabelComponent, NbSelectModule, NbTableModule, NbThemeModule, NbWindowConfig, NbWindowModule, NbWindowRef } from '@nebular/theme';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './users/edit-user/edit-user.component';

const config = {
  
  hasBackdrop: true,
  closeOnBackdropClick: true,
  closeOnEsc: true,
} as NbWindowConfig;
@NgModule({
  declarations: [
    ...routedComponents,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    NbTableModule,
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbFormFieldModule,
    NbButtonModule,   
    NbSelectModule,   
    HttpClientModule,
    NbCardModule,
    ReactiveFormsModule,
    NbWindowModule.forRoot(), 
  ],
})
export class AdministrationModule { }

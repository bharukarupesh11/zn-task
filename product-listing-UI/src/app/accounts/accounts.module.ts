import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterUserComponent],
  imports: [CommonModule, AccountsRoutingModule, ReactiveFormsModule],
})
export class AccountsModule {}

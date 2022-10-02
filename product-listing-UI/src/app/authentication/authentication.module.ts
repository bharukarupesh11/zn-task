import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

console.warn('Auth Module Loaded');

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthenticationRoutingModule, ReactiveFormsModule],
})
export class AuthenticationModule {}

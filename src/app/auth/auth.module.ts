import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { BackendErrorMessagesModule } from '../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffect } from './store/effects/login.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { GetCurrentUserEffect } from './store/effects/getCurrentUser.effect';
import { LogoutEffect } from './store/effects/logout.effect';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzSpinModule,
    CommonModule,
    BackendErrorMessagesModule,
    EffectsModule.forFeature([LoginEffect, LogoutEffect, GetCurrentUserEffect]),
    StoreModule.forFeature('auth', reducers),
  ],
  providers: [CookieService, AuthService, FormBuilder],
  exports: [LoginComponent, RegistrationComponent],
})
export class AuthModule {}

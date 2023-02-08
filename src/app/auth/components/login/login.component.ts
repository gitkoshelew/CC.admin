import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { loginAction } from '../../store/actions/login.action';
import { isSubmittingSelector } from '../../store/selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;

  submitForm(): void {
    const request: LoginRequestInterface = this.validateForm.value;
    this.store.dispatch(loginAction({ request }));
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}
  initializeForm(): void {
    this.validateForm = this.fb.group({
      email: '',
      password: '',
      rememberMe: true,
    });
  }
  initializeValue(): void {
    this.isSubmitting$ = this.store.select(isSubmittingSelector);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValue();
  }
}

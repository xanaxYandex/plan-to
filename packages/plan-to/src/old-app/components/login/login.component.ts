import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {AuthStateService} from '../../services/auth-state.service';

@Component({
  selector: 'plan-to-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  constructor(private fb: NonNullableFormBuilder,
              private auth: AuthStateService) {
  }

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  public submit(): void {
    if (this.form.invalid) return;

    this.auth.loginAndSetAuthToken(this.form.getRawValue());
  }
}

import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {SubscriptionService} from '../../services/subscription.service';
import {AsyncPipe} from '@angular/common';
import {AuthStateService} from '../../services/auth-state.service';

@Component({
  standalone: true,
  selector: 'plan-to-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    AsyncPipe
  ]
})
export class LoginComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthStateService);

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  public submit(): void {
    if (this.form.invalid) return;

    this.auth.loginAndSetAuthToken(this.form.getRawValue());
  }
}

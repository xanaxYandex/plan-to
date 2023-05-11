import {RouterOutlet} from '@angular/router';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'plan-to-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}



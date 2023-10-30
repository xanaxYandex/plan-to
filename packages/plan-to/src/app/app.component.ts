import {RouterOutlet} from '@angular/router';
import {ChangeDetectionStrategy, Component, computed, Input, signal} from '@angular/core';
import {CommonModule} from "@angular/common";


@Component({
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [],
  selector: 'plan-to-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  // some code...
  // some more code...
}



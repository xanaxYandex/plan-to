import {RouterOutlet} from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {CommonModule, NgFor} from "@angular/common";
import {FormsTestComponent} from "./forms-test/forms-test.component";
import {TextComponent} from "./forms-test/components/text/text.component";
import {NumberComponent} from "./forms-test/components/number/number.component";
import {SelectComponent} from "./forms-test/components/select/select.component";
import {GroupComponent} from "./forms-test/components/group/group.component";


@Component({
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgFor, FormsTestComponent],
  providers: [
    {
      provide: 'formControlTemplates',
      useValue: {
        text: TextComponent,
        number: NumberComponent,
        select: SelectComponent,
        group: GroupComponent
      }
    }
  ],
  selector: 'plan-to-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}



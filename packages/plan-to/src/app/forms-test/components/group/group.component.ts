import {ChangeDetectionStrategy, Component, forwardRef, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsTestComponent} from "../../forms-test.component";
import {PlanToBaseFormGroupDirective} from "../base-form-control/base-form-group.component";

@Component({
  selector: 'plan-to-group',
  standalone: true,
  providers: [
    {provide: FormsTestComponent, useExisting: forwardRef(() => FormsTestComponent)}
  ],
  imports: [CommonModule, FormsTestComponent],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupComponent extends PlanToBaseFormGroupDirective {
}

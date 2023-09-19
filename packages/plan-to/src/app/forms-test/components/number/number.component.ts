import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlanToBaseFormControlDirective} from "../base-form-control/base-form-control.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'plan-to-number',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberComponent extends PlanToBaseFormControlDirective {

}

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlanToBaseFormControlDirective} from "../base-form-control/base-form-control.component";
import {IOption} from "../../mockConfig";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'plan-to-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends PlanToBaseFormControlDirective {
  @Input() options: IOption[] = [];
}

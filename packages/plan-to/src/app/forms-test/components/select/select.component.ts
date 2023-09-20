import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlanToBaseFormControlDirective} from "../base-abstract-controls/base-form-control.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IOption} from "../../form-types";

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
  @Input() value: string | number | IOption | null = null;
}

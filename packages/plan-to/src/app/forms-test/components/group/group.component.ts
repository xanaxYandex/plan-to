import {ChangeDetectionStrategy, Component, forwardRef, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroupBuilderComponent} from "../../form-group-builder.component";
import {PlanToBaseFormGroupDirective} from "../base-abstract-controls/base-form-group.directive";

@Component({
  selector: 'plan-to-group',
  standalone: true,
  imports: [CommonModule, FormGroupBuilderComponent],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupComponent extends PlanToBaseFormGroupDirective {
}

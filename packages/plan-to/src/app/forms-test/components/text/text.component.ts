import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import {PlanToBaseFormControlDirective} from "../base-abstract-controls/base-form-control.directive";

@Component({
  selector: 'plan-to-text',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent extends PlanToBaseFormControlDirective {

}

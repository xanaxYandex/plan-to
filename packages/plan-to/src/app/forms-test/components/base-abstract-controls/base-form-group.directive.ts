import {Directive, Input} from '@angular/core';
import { FormGroup} from "@angular/forms";
import {PlanToBaseFormFieldDirective} from "./base-form-field.directive";

import {GroupControlConfig} from "../../form-types";

@Directive({
  selector: '[planToBaseFormGroup]',
})
export abstract class PlanToBaseFormGroupDirective extends PlanToBaseFormFieldDirective {
  @Input() override control = new FormGroup({});
  @Input() config!: GroupControlConfig;
}

import {Directive, Input} from '@angular/core';
import { FormGroup} from "@angular/forms";
import {PlanToBaseFormFieldDirective} from "./base-form-field.component";
import {GroupControlConfig} from "../../mockConfig";

@Directive({
  selector: '[planToBaseFormGroup]',
})
export abstract class PlanToBaseFormGroupDirective extends PlanToBaseFormFieldDirective {
  @Input() override control = new FormGroup({});
  @Input() config!: GroupControlConfig;
}

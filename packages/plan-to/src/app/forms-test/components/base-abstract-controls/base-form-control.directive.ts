import {Directive, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {PlanToBaseFormFieldDirective} from "./base-form-field.directive";

@Directive({
  selector: '[planToBaseFormControl]',
})
export abstract class PlanToBaseFormControlDirective extends PlanToBaseFormFieldDirective {
  @Input() override control: FormControl = new FormControl();
  @Input() additionalText = '';
}

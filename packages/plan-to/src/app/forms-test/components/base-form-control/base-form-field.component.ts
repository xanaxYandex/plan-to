import {Directive, Input} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Directive({
  selector: '[planToBaseFormField]',
})
export abstract class PlanToBaseFormFieldDirective {
  @Input() control: FormControl | FormArray | FormGroup | null = new FormControl();
  @Input() label = '';
  @Input() hideLabel = false;
  @Input() required = true;
}

import {Directive, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {IOption} from "../../mockConfig";

@Directive({
  selector: '[planToBaseFormControl]',
})
export abstract class PlanToBaseFormControlDirective {
  @Input() control: FormControl | null = new FormControl();
  @Input() label = '';
  @Input() additionalText = '';
  @Input() hideLabel = false;
  @Input() required = true;
  @Input() value: string | number | IOption | null = null;
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormItemCommon, formItems} from './mockConfig';
import {AbstractControl, FormBuilder, FormControl} from "@angular/forms";
import {TextComponent} from "./components/text/text.component";
import {NumberComponent} from "./components/number/number.component";
import {SelectComponent} from "./components/select/select.component";
import {PlanToBaseFormControlDirective} from "./components/base-form-control/base-form-control.component";

@Component({
  selector: 'plan-to-forms-test',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: 'formControlTemplates',
      useValue: {
        text: TextComponent,
        number: NumberComponent,
        select: SelectComponent
      }
    }
  ],
  templateUrl: './forms-test.component.html',
  styleUrls: ['./forms-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsTestComponent {
  @ViewChild('viewRef', {read: ViewContainerRef}) containerElem !: ViewContainerRef;
  public formGroup = this.formBuilder.group({});

  constructor(
    public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject('formControlTemplates') private formControlTemplates: Record<string, any>
  ) {
  }

  public formConfig = {
    type: "single",
    label: "Single form",
    controls: Object.values(formItems) as any[]
  }

  ngAfterViewInit() {
    this.renderForm();
  }

  public renderForm() {
    this.formConfig.controls.forEach((i: FormItemCommon, index: number) => {
      if(this.formControlTemplates[i.type]) {
        const {instance} = this.containerElem.createComponent(this.formControlTemplates[i.type]);

        if (!instance) return;

        if (instance instanceof PlanToBaseFormControlDirective) {
          this.formGroup.addControl(i.name, new FormControl());
          instance.control = this.formGroup.get([i.name]) as FormControl;
          instance.hideLabel = i.hideLabel;
          instance.label = i.label;
          instance.required = i.required
          instance.additionalText = i.additionalText;
          // componentRef.setInput('control', this.formGroup.get([i.name]));
          // componentRef.setInput('hideLabel', i.hideLabel);
          // componentRef.setInput('label', i.label);
          // componentRef.setInput('required', i.required);
          // componentRef.setInput('additionalText', i.additionalText);
        }

        if (instance instanceof SelectComponent && i.options) {
          instance.options = i.options;
          // componentRef.setInput('options', i.options);
        }

      }
    })
    this.cdr.detectChanges();
  }
}

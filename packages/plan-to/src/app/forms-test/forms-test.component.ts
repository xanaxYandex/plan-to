import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject, Input,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseControlConfig, formItems, GroupControlConfig, SelectableControlConfig} from './mockConfig';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

import {SelectComponent} from "./components/select/select.component";
import {PlanToBaseFormControlDirective} from "./components/base-form-control/base-form-control.component";
import {PlanToBaseFormFieldDirective} from "./components/base-form-control/base-form-field.component";
import {GroupComponent} from "./components/group/group.component";
import {PlanToBaseFormGroupDirective} from "./components/base-form-control/base-form-group.component";


const defineControl = (type: BaseControlConfig["type"]) => {
  switch (type) {
    case 'text':
    case 'select':
    case 'number': return new FormControl();
    case 'group': return new FormGroup({});
    default: return new FormControl();
  }
}

@Component({
  selector: 'plan-to-forms-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forms-test.component.html',
  styleUrls: ['./forms-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsTestComponent {
  @ViewChild('viewRef', {read: ViewContainerRef}) containerElem !: ViewContainerRef;

  @Input() fg = this.formBuilder.group({});
  @Input() formConfig: GroupControlConfig = {
    type: "group",
    name: "form",
    label: "Single form",
    controls: Object.values(formItems)
  }

  constructor(
    public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject('formControlTemplates') private formControlTemplates: Record<string, any>
  ) {
  }

  ngAfterViewInit() {
    this.renderForm();
  }

  public renderForm() {
    this.formConfig.controls.forEach((i: BaseControlConfig | SelectableControlConfig | GroupControlConfig, index: number) => {
      if(this.formControlTemplates[i.type]) {
        const {instance} = this.containerElem.createComponent(this.formControlTemplates[i.type]);

        if (!instance) return;

        if (instance instanceof PlanToBaseFormFieldDirective) {
          this.fg.addControl(i.name, defineControl(i.type));
          instance.control = this.fg.get([i.name]) as FormControl;
          instance.hideLabel = i.hideLabel!;
          instance.label = i.label!;
          instance.required = i.required!
        }

        if (instance instanceof PlanToBaseFormGroupDirective && ('controls' in i)) {
          instance.config = i;
        }

        if (instance instanceof PlanToBaseFormControlDirective) instance.additionalText = i.additionalText!;
        if (instance instanceof SelectComponent && ('options' in i)) instance.options = i.options;

      }
    })
    this.cdr.detectChanges();
  }
}

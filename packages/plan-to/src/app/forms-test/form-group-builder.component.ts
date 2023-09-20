import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  QueryList,
  Type,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {formItems} from './mockConfig';
import {FormBuilder, FormControl} from "@angular/forms";

import {SelectComponent} from "./components/select/select.component";
import {PlanToBaseFormControlDirective} from "./components/base-abstract-controls/base-form-control.directive";
import {PlanToBaseFormFieldDirective} from "./components/base-abstract-controls/base-form-field.directive";
import {PlanToBaseFormGroupDirective} from "./components/base-abstract-controls/base-form-group.directive";
import {ControlConfig, GroupControlConfig} from "./form-types";
import {defineControl, isBaseControl, isGroupControl, isSelectableControl} from "./form-helper";

@Component({
  selector: 'plan-to-form-group-builder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-group-builder.component.html',
  styleUrls: ['./form-group-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupBuilderComponent implements AfterViewInit {
  @ViewChildren('viewRef', {read: ViewContainerRef}) containerElem!: QueryList<ViewContainerRef>;

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
    @Inject('formControlTemplates') private formControlTemplates: Record<string, Type<unknown>>
  ) {
  }

  public ngAfterViewInit() {
    this.renderForm();
  }

  public renderForm() {
    this.formConfig.controls.forEach((i: ControlConfig, index: number) => {
      if(this.formControlTemplates[i.type]) {
        const {instance} = this.containerElem.get(index)!.createComponent(this.formControlTemplates[i.type]);

        if (!instance) return;

        if (instance instanceof PlanToBaseFormFieldDirective) {
          this.fg.addControl(i.name, defineControl(i.type));
          instance.control = this.fg.get([i.name]) as FormControl;
          instance.hideLabel = i.hideLabel!;
          instance.label = i.label!;
          instance.required = i.required!
        }

        if (instance instanceof PlanToBaseFormGroupDirective && isGroupControl(i)) instance.config = i;
        if (instance instanceof PlanToBaseFormControlDirective && isBaseControl(i)) instance.additionalText = i.additionalText!;
        if (instance instanceof SelectComponent && isSelectableControl(i)) instance.options = i.options;
      }
    })
    this.cdr.detectChanges();
  }
}


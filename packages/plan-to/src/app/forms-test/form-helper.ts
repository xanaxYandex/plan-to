import {BaseControlConfig, ControlConfig, GroupControlConfig, SelectableControlConfig} from "./form-types";
import {FormControl, FormGroup} from "@angular/forms";

export function isSelectableControl(config: ControlConfig): config is SelectableControlConfig {
  return 'options' in config;
}

export function isGroupControl(config: ControlConfig): config is GroupControlConfig {
  return 'controls' in config;
}

export const defineControl = (type: BaseControlConfig["type"]) => {
  switch (type) {
    case 'text':
    case 'select':
    case 'number':
      return new FormControl();
    case 'group':
      return new FormGroup({});
    default:
      return new FormControl();
  }
}

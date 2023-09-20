export type ControlType =
  'text' |
  'number' |
  'select' |
  'group' |
  'password' |
  'email' |
  'phone' |
  'textarea' |
  'multiselect' |
  'toggle' |
  'radio' |
  'checkbox' |
  'number-slider' |
  'number-operations' |
  'date' |
  'date-triplet' |
  'array' |
  'object' |
  'file' |
  'dropzone' |
  'object-latest';

export type MathOperator = 'sum' | 'min' | 'div' | 'multi' | 'eq';

export interface IOption {
  label: string;
  value: string
}

export interface ITextMask {
  mask: string;
  prefix: string;
  suffix: string;
  thousands_separator: string;
}

export interface ISliderOptions {
  min: number;
  max: number;
  range: boolean;
}

export interface IObjectReference {
  address: string;
  version_id: string;
  display_name: string;
}


// GENERAL-------------------------
export interface BaseFormItemConfig {
  type: ControlType;
  name: string;
  label?: string;
  required?: boolean;
  hideLabel?: boolean;
}

export interface BaseControlConfig extends BaseFormItemConfig {
  value: string | number | boolean | null | undefined | string[] | number[] | Record<string, string[] | number[]> | {$ref: IObjectReference};
  validators?: string[];
  additionalText?: string;
  placeholder?: string;
}

export interface SelectableControlConfig extends BaseControlConfig {
  options: IOption[];
}

export interface TextControlConfig extends BaseControlConfig {
  mask?: ITextMask;
}
// --------------------------------


// GROUPS--------------------------
export interface GroupControlConfig extends BaseFormItemConfig {
  controls: BaseFormItemConfig[];
}
// --------------------------------


// CONTROLS------------------------
export interface SingleSelectControlConfig extends SelectableControlConfig {
  showSearch: boolean
}

export interface NumberSliderControlConfig extends BaseControlConfig {
  sliderOptions: ISliderOptions;
  customLabel: string[];
}

export interface NumberOperationsControlConfig extends BaseControlConfig {
  operations: Array<
    Omit<BaseFormItemConfig, 'hideLabel' | 'name'> & {
    operator: MathOperator;
    additionalText: BaseControlConfig['additionalText']
  }
  >;
}

export interface ArrayControlConfig extends BaseControlConfig {
  control: TextControlConfig | SingleSelectControlConfig | BaseControlConfig;
}

export interface ObjectControlConfig extends BaseControlConfig {
  entityType: string;
}
// --------------------------------


export type ControlConfig =
  BaseFormItemConfig |
  BaseControlConfig |
  GroupControlConfig |
  SingleSelectControlConfig |
  TextControlConfig |
  NumberSliderControlConfig |
  NumberOperationsControlConfig |
  ArrayControlConfig |
  ObjectControlConfig;

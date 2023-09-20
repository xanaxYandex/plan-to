export interface IOption {
  label: string;
  value: string
}

export interface BaseControlConfig {
  type: 'text' | 'number' | 'select' | 'group';
  name: string;
  label?: string;
  required?: boolean;
  hideLabel?: boolean;
  additionalText?: string;
  placeholder?: string;
}

export interface SelectableControlConfig extends BaseControlConfig {
  options: IOption[];
  value: string | number | boolean | null | undefined | string[] | number [];
}

export interface GroupControlConfig extends BaseControlConfig {
  controls: BaseControlConfig[];
}

export type ControlConfig = BaseControlConfig | SelectableControlConfig | GroupControlConfig;

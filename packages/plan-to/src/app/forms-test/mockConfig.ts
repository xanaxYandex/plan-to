import {BaseFormItemConfig, ControlConfig, GroupControlConfig} from "./form-types";

export const formItems: Record<string, ControlConfig> = {
  text: {
    type: 'text',
    placeholder: '',
    name: 'text',
    required: true,
    value: '',
    label: 'Text Input',
    hideLabel: false,
    validators: [
      'PatternValidator'
    ],
    additionalText: 'Additional Text',
    mask: {
      mask: '',
      prefix: '',
      suffix: '',
      thousands_separator: ''
    }
  },
  singleSelect: {
    type: 'select',
    showSearch: true,
    label: 'Single select',
    hideLabel: false,
    name: 'SingleSelect',
    additionalText: '',
    required: true,
    validators: [],
    value: '',
    placeholder: 'Single select',
    options: [
      {label: '1', value: '2'},
      {label: '3', value: '4'}
    ]
  },
  number: {
    type: 'number',
    placeholder: '',
    required: true,
    label: 'Number Input',
    name: 'number',
    hideLabel: false,
    value: '',
    validators: [],
    additionalText: 'Additional Text',
    mask: {
      mask: '',
      prefix: '',
      suffix: '',
      thousands_separator: ''
    }
  },
  // password: {
  //   type: 'password',
  //   placeholder: '',
  //   value: '',
  //   name: 'password',
  //   required: true,
  //   label: 'Password Input',
  //   hideLabel: false,
  //   validators: [
  //     'PasswordValidator'
  //   ],
  //   additionalText: 'Additional Text',
  // },
  // email: {
  //   type: 'email',
  //   placeholder: '',
  //   required: true,
  //   name: 'email',
  //   value: '',
  //   label: 'Password Input',
  //   hideLabel: false,
  //   validators: [
  //     'emailValidator'
  //   ],
  //   additionalText: 'Additional Text',
  // },
  // phone: {
  //   type: 'phone',
  //   name: 'phone',
  //   placeholder: '',
  //   required: true,
  //   value: '',
  //   label: 'Password Input',
  //   hideLabel: false,
  //   validators: ['phoneValidator'],
  //   additionalText: 'Additional Text',
  //   mask: {
  //     mask: '',
  //     prefix: '',
  //     suffix: '',
  //     thousands_separator: ''
  //   }
  // },
  // textarea: {
  //   type: "textarea",
  //   placeholder: "",
  //   value: '',
  //   name: 'textarea',
  //   required: true,
  //   label: "Password Input",
  //   hideLabel: false,
  //   validators: [],
  //   additionalText: 'Additional Text',
  // },
  // multiselect: {
  //   type: "multiselect",
  //   label: "Multi select",
  //   name: 'multiselect',
  //   hideLabel: false,
  //   additionalText: '',
  //   required: true,
  //   value: '',
  //   validators: [],
  //   placeholder: 'Multi select',
  //   options: [
  //     {label: '1', value: '2'},
  //     {label: '3', value: '4'}
  //   ]
  // },
  // toggle: {
  //   type: "toggle",
  //   name: 'toggle',
  //   label: "Toggle Input",
  //   value: false,
  //   hideLabel: false,
  //   required: true,
  //   additionalText: "toggle input",
  // },
  // radio: {
  //   type: "radio",
  //   name: 'radio',
  //   options: [
  //     {label: '1', value: '2'},
  //     {label: '3', value: '4'}
  //   ],
  //   required: true,
  //   hideLabel: false,
  //   value: '',
  //   label: 'Radio Input',
  //   validators: [],
  //   additionalText: 'Addition text'
  // },
  // checkbox: {
  //   type: "checkbox",
  //   name: 'checkbox',
  //   options: [
  //     {label: '1', value: '2'},
  //     {label: '3', value: '4'}
  //   ],
  //   required: true,
  //   hideLabel: false,
  //   value: '',
  //   label: 'Checkbox Input',
  //   validators: [],
  //   additionalText: 'Addition text'
  // },
  // 'number-slider': {
  //   type: 'number-slider',
  //   name: 'numberSlider',
  //   sliderOptions: {
  //     min: 0,
  //     max: 0,
  //     range: false,
  //   },
  //   value: '',
  //   additionalText: 'Number Slider',
  //   label: "Number Slider",
  //   hideLabel: false,
  //   validators: [],
  //   placeholder: 'Number Slider',
  //   customLabel: [], // required to reflect some math calc changes in input - like sum per month
  //   required: true,
  // },
  // 'number-operations': {
  //   type: "number-operations",
  //   value: '',
  //   name: 'numberOperations',
  //   operations: [
  //     {
  //       type: 'number',
  //       operator: 'sum',
  //       label: 'Sum',
  //       required: true,
  //       additionalText: '',
  //     },
  //     {
  //       type: 'number',
  //       operator: "min",
  //       label: 'Min',
  //       required: true,
  //       additionalText: ''
  //     },
  //     {
  //       type: 'number',
  //       operator: "div",
  //       label: 'divide',
  //       required: true,
  //       additionalText: ''
  //     },
  //     {
  //       type: 'number',
  //       operator: "multi",
  //       label: 'Multiplication',
  //       required: true,
  //       additionalText: ''
  //     },
  //     {
  //       type: 'number',
  //       operator: "eq",
  //       label: 'equals',
  //       required: true,
  //       additionalText: ''
  //     },
  //   ],
  //   required: true,
  //   label: 'Number ops',
  //   additionalText: '',
  //   hideLabel: false,
  // },
  // date: {
  //   label: 'DateInput',
  //   hideLabel: false,
  //   name: 'date',
  //   type: 'date',
  //   value: '',
  //   required: true,
  //   placeholder: '',
  //   additionalText: '',
  // },
  // dateTriplet: {
  //   value: '',
  //   name: 'date',
  //   type: 'date-triplet',
  //   required: true,
  //   label: 'Date Triplet',
  //   hideLabel: false,
  //   placeholder: '',
  //   additionalText: ''
  // },
  // array: { //need to redo form item
  //   value: [],
  //   type: 'array',
  //   name: 'array',
  //   hideLabel: false,
  //   label: 'Array',
  //   additionalText: '',
  //   required: true,
  //   control: {
  //       type: 'text',
  //       placeholder: '',
  //       name: 'text',
  //       required: true,
  //       value: '',
  //       label: 'Text Input',
  //       hideLabel: false,
  //       validators: [
  //         'PatternValidator'
  //       ],
  //       additionalText: 'Additional Text',
  //       mask: {
  //         mask: '',
  //         prefix: '',
  //         suffix: '',
  //         thousands_separator: ''
  //       }
  //   }
  // },
  // object: {
  //   name: 'ObjectAttribute',
  //   type: 'object',
  //   label: 'Person',
  //   required: true,
  //   hideLabel: false,
  //   validators: [],
  //   entityType: 'Person',
  //   value: {
  //     $ref: {
  //       "address": "amsdalbase::Person:85af098170ae4bdba9015f2aa0baf0f9",
  //       "version_id": "",
  //       "display_name": "Doe, John"
  //     }
  //   },
  // },
  // attachment: {
  //   name: 'file',
  //   type: 'file',
  //   required: true,
  //   value: '',
  //   label: 'File',
  //   hideLabel: false,
  // },
  // dropzone: {
  //   name: 'dropfile',
  //   required: true,
  //   value: '',
  //   type: 'dropzone',
  //   label: 'Drop File',
  //   hideLabel: false,
  // },
  // object_latest: {
  //   type: 'object-latest',
  //   name: 'object_latest',
  //   value: {
  //     $ref: {
  //       "address": "amsdalbase::Person:85af098170ae4bdba9015f2aa0baf0f9",
  //       "version_id": "",
  //       "display_name": "Doe, John"
  //     }
  //   },
  //   required: true,
  //   entityType: 'Person',
  //   options: [],
  //   label: 'Object latest',
  //   hideLabel: false,
  // },
}
export const group: GroupControlConfig = {
  type: 'group',
  name: 'group',
  required: true,
  controls: [
    formItems["text"],
    formItems["number"],
    formItems["singleSelect"],
  ],
  label: 'Group object',
  hideLabel: false
}

formItems["someGroup"] = {
  type: 'group',
  name: 'someGroup',
  required: true,
  controls: [
    formItems["text"],
    formItems["number"],
    formItems["singleSelect"],
    group
  ],
  label: 'Group object',
  hideLabel: false
};


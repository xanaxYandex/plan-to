import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

export type FormFrom<T> = {
  [K in keyof T]: T[K] extends Array<any>
    ? FormArray<FormControl<T[K]>>
    : T[K] extends { [key: string]: any }
      ? FormGroup<FormFrom<T[K]>>
      : T[K] extends string
        ? FormControl<string>
        : T[K] extends Date | string
          ? FormControl<Date>
          : FormControl<number>
};

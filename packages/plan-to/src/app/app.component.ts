import {RouterOutlet} from '@angular/router';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed, inject,
  Input, OnInit,
  QueryList,
  signal, TemplateRef,
  ViewChildren, ViewContainerRef
} from '@angular/core';
import {CommonModule, NgFor} from "@angular/common";
import {LoadingIndicatorComponent} from "./shared/components/loading-indicator/loading-indicator.component";
import {AbstractControl, FormBuilder, FormControl} from "@angular/forms";
import {FormsTestComponent} from "./forms-test/forms-test.component";


@Component({
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgFor, FormsTestComponent],
  providers: [],
  selector: 'plan-to-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}



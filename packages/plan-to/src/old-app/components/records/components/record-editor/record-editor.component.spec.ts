import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordEditorComponent } from './record-editor.component';

describe('RecordEditorComponent', () => {
  let component: RecordEditorComponent;
  let fixture: ComponentFixture<RecordEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

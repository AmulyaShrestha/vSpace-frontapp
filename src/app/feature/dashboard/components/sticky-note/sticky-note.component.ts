import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.scss']
})
export class StickyNoteComponent implements OnInit {
  @Input() noteObject;
  @Input() activeWidgetIndex;
  @Output() valueChange = new EventEmitter();
  stickyNoteForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.stickyNoteForm = this.formBuilder.group({
      title: undefined,
      content: undefined
    });
    this.stickyNoteForm.patchValue(this.noteObject);
  }

  valueChanged() {
    const emittedObject = {
      noteObject: this.stickyNoteForm.value,
      activeWidgetIndex: this.activeWidgetIndex
    };
    this.valueChange.emit(emittedObject);
  }

}

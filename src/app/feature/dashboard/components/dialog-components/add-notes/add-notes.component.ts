import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  stickyNoteForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddNotesComponent>) { }

  ngOnInit(): void {
    this.stickyNoteForm = this.formBuilder.group({
      title: undefined,
      content: undefined
    });
  }

  addStickyNote() {
      this.dialogRef.close(this.stickyNoteForm.value);
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
  @Input() toDoObject;
  @Input() activeWidgetIndexForToDo;
  @Output() toDoValueChange = new EventEmitter();
  toDoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.toDoForm = this.formBuilder.group({
      title: [undefined, Validators.required],
      toDoList: this.formBuilder.array([]),
    });
    this.toDoForm.get('title').patchValue(this.toDoObject.title);
    this.setIntoToDoListFormArray(JSON.parse(this.toDoObject.toDoList));
  }

  setIntoToDoListFormArray(toDoList: Array<any>) {
    toDoList.forEach( singleToDo => {
      (this.toDoForm.get('toDoList') as FormArray).push(
        this.formBuilder.group({
          toDoContent: singleToDo.toDoContent,
          checked: singleToDo.checked
        })
      );
    });
  }

  onClickDone(singleToDoFormGroup: FormGroup) {
    singleToDoFormGroup.controls.checked.patchValue(!singleToDoFormGroup.controls.checked.value);
    this.valueChanged();
  }

  valueChanged() {
    const emitToDoObject = {
      title: this.toDoForm.controls.title.value,
      toDoList: JSON.stringify(this.toDoForm.controls.toDoList.value)
    };
    const emittedObject = {
      toDoObject: emitToDoObject,
      activeWidgetIndexForToDo: this.activeWidgetIndexForToDo
    };
    this.toDoValueChange.emit(emittedObject);
  }
}

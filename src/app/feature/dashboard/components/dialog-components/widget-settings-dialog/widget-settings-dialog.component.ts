import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-widget-settings-dialog',
  templateUrl: './widget-settings-dialog.component.html',
  styleUrls: ['./widget-settings-dialog.component.scss']
})
export class WidgetSettingsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<WidgetSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public item
  ) {
  }

  onSave() {
    this.dialogRef.close();
  }
}

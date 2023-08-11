import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'nctr-modal-help',
  templateUrl: './help.modal.html',
  styleUrls: ['./help.modal.scss'],
})
export class HelpModal {
    constructor(public dialogRef: MatDialogRef<HelpModal>) {

    }
}

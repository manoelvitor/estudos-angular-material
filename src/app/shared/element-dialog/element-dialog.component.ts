import { AgendaExame } from 'src/app/models/AgendaExame';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {
  element!: AgendaExame;
  ischange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AgendaExame,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {  
    if(this.data.id !== null ){
      this.ischange = true;
    }
    else{
      this.ischange = false;
    }
  }


}

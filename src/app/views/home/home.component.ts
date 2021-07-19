import { AgendaService } from './../../services/agenda.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AgendaExame } from 'src/app/models/AgendaExame';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    AgendaService
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;

  displayedColumns: string[] = ['id', 'nomePaciente', 'nomeExame', 'dataExame', 'resultadoExame', 'action'];
  dataSource!: AgendaExame[];



  constructor(
    public dialog: MatDialog,
    public agendaService: AgendaService
  ) {
    this.agendaService.getAgenda()
      .subscribe((data: AgendaExame[]) => {
        this.dataSource = data;
      }
      );


  }


  ngOnInit(): void {
    console.log(this.dataSource)


  }

  openDialog(element: AgendaExame | null): void {

    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        id: null,
        nomePaciente: '',
        nomeExame: '',
        dataExame: '',
        resultadoExame: "",
      } : {
        id: element.id,
        nomePaciente: element.nomePaciente,
        nomeExame: element.nomeExame,
        resultadoExame: element.resultadoExame
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.dataSource[result.position - 1] = result;
          this.table.renderRows();
        }
        else {
          this.agendaService.createElement(result)
            .subscribe((data: AgendaExame) => {
              this.dataSource.push(result);
              this.table.renderRows();
            })

        }
      }
    });
  }


  deleteElement(id: number) {
    this.dataSource = this.dataSource.filter(p => p.id !== id);
  }

  editElement(element: AgendaExame) {
    this.openDialog(element)
  }

}

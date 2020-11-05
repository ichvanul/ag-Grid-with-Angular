import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { CustomizedCellComponent } from './customized-cell/customized-cell.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  title = 'my-app';

  public columnDefs: any;
  public gridApi: any;
  public gridColumnApi: any;
  public searchValue: any;
  public frameworkComponents: any;
  public sortingOrder: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'athlete',
        width: 150
      },
      {
        headerName: 'Age',
        field: 'age',
        width: 100,
        cellRenderer: 'customizedAgeCell'
      },
      {
        headerName: 'Country',
        field: 'country',
        width: 150,
        lockPosition: true,
        suppressNavigable: true,
        rowDrag: true
      },
      {
        headerName: 'Year',
        field: 'year',
        width: 70
      },
      {
        headerName: 'Date',
        field: 'date',
        width: 100
      },
      {
        headerName: 'Sport',
        field: 'sport',
        width: 100
      },
      {
        headerName: 'Gold',
        field: 'gold',
        width: 80
      },
      {
        headerName: 'Silver',
        field: 'silver',
        width: 80
      },
      {
        headerName: 'Bronze',
        field: 'bronze',
        width: 80
      },
      {
        headerName: 'Total',
        field: 'total',
        width: 100
      },
    ];
    this.frameworkComponents = {
      customizedAgeCell: CustomizedCellComponent
    };
  }

  // tslint:disable-next-line: typedef
  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    this.http
    .get('https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinnersSmall.json')
    .subscribe(data => {
      params.api.setRowData(data);
    });
  }

  // tslint:disable-next-line: typedef
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => {
      if (node.groupData) {
        return { make: node.key, model: 'Group' };
      }
      return node.data;
    });
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}

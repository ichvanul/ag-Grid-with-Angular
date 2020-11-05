import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-costumized-cell',
  templateUrl: './customized-cell.component.html',
  styleUrls: ['./customized-cell.component.css']
})
export class CustomizedCellComponent implements OnInit, ICellRendererAngularComp {

  public cellvalue: any;

  constructor() { }

  ngOnInit(): void {
  }

  agInit(params: any){
    if (params.value > 20){
      this.cellvalue = 'Above 20';
    }else{
      this.cellvalue = 'Below 21';
    }
  }

  refresh(params: any): boolean{
    this.cellvalue = params.value;
    return true;
  }

}

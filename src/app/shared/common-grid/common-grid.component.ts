import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnConfig, GridConfig } from 'src/app/models/gridconfig';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  styleUrls: ['./common-grid.component.css']
})
export class CommonGridComponent implements OnInit, OnChanges {
  @Input() gridConfig!: GridConfig;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @Output() gridOperation = new EventEmitter<string>();  
  selection = new SelectionModel<User>(true, []);
  dataSource!: MatTableDataSource<User>;

  constructor() { }

  ngOnInit(): void {       
  }

  ngOnChanges(){
    this.clearGrid();
    this.dataSource = new MatTableDataSource(this.gridConfig.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get getColumnKeys(){
    return this.gridConfig.columnConfig.map((data: ColumnConfig) => data.key);
  }

  // Whether the number of selected elements matches the total number of rows.
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.gridConfig.data.length;
    return numSelected === numRows;
  }

  //Selects all rows if they are not all selected; otherwise clear selection.
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.gridConfig.data.forEach(row => this.selection.select(row));
  }

  //emits the data to parent components
  emitData(operation: string){    
    this.gridOperation.emit(operation)
  }

  //clear grid after operation
  clearGrid(){
    this.selection = new SelectionModel<User>(true, []);
  }

  //for tracking loop
  trackBy(index: number, item: ColumnConfig) {
    return item.key;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

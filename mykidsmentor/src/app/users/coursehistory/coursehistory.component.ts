import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  amount: number;
  courseBought: string;
  paymentMethod: string;
  orderedTime: string;
  orderStatus: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {courseBought: '第一堂課', amount: 300, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第二堂課', amount: 400, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第三堂課', amount: 150, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第四堂課', amount: 200, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第五堂課', amount: 350, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第六堂課', amount: 250, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第七堂課', amount: 180, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第八堂課', amount: 170, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第久堂課', amount: 280, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
  {courseBought: '第十堂課', amount: 340, paymentMethod: 'ATM', orderedTime: '2021/1/22', orderStatus: '訂單成功'},
];

@Component({
  selector: 'app-coursehistory',
  templateUrl: './coursehistory.component.html',
  styleUrls: ['./coursehistory.component.css']
})
export class CoursehistoryComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['courseBought', 'amount', 'paymentMethod', 'orderedTime', 'orderStatus'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

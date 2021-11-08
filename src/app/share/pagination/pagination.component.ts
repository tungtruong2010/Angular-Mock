import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalItems:number = 0;
  @Input() limitNumber:number = 10;
  @Output() selectPage = new EventEmitter();
  public listPage:Array<number> = [];
  public currentPage:number = 1;
  constructor() { }

  ngOnInit(): void {
    let lengthListPage = Math.ceil(this.totalItems / this.limitNumber);
    this.listPage = Array(lengthListPage).fill(0)
  }

  public handleSelectPage(pageNumber:number):void {
    this.selectPage.emit(pageNumber)
    this.currentPage = pageNumber
  }

}

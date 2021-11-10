import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalItems:number = 0;
  @Input() limitNumber:number = 10;
  @Output() selectPage = new EventEmitter();
  public listPage:Array<number> = [];
  public currentPage:number = 1;
  constructor() { }
  ngOnChanges(){
    let lengthListPage = Math.ceil(this.totalItems / this.limitNumber);
    if(!isNaN(lengthListPage)){
      this.listPage = Array(lengthListPage).fill(0)
    }
  }
  ngOnInit(): void {
  }

  public handleSelectPage(pageNumber:number):void {
    this.selectPage.emit(pageNumber)
    this.currentPage = pageNumber
  }

}

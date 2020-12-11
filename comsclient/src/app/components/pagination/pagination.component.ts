import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'paginate',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalCount:number;
  @Input() perPageCount:number;
  totalPages:number;
  @Output() onChangePage:EventEmitter<number> =new EventEmitter();

  currentPage:number = 1;

  constructor() { 
  }

  ngOnInit() {
    
  }
  ngOnChanges(){
    this.totalPages = Math.ceil((this.totalCount)/(this.perPageCount));
  }
  prevPage(){
    if(this.currentPage<=1) return;
    --this.currentPage;
    this.changePage(this.currentPage);
  }
  nextPage(){
    if(this.currentPage>100 ||this.currentPage<1) return;
    ++this.currentPage;

    this.changePage(this.currentPage);
  }

  counter(i:number){
    return new Array(i);
  }
  changePage(page:number){
    this.currentPage = page;
    this.onChangePage.emit(page);

  }
}

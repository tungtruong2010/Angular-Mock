import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorArticleService } from 'src/app/service/implement-services/editor-article.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges {
  public listCmts:any
  @Input() listCmt:any;
  @Output() deletedList = new EventEmitter<any>();
  constructor(private service: EditorArticleService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  ngOnChanges(){
    let slug= this.route.snapshot.paramMap.get('slug');
    this.listCmts=this.listCmt;
    this.service.getCmt(slug).subscribe((data:any)=>{
      //console.log("cmt`1",data);
      this.listCmt=data.comments;
    })
  }
  deleteComment(id:any){
    //let slug= this.route.snapshot.paramMap.get('slug');
    this.deletedList.emit(id);
  }
}

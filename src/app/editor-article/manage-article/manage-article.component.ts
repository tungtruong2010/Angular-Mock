import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorArticleService } from 'src/app/service/implement-services/editor-article.service';

@Component({
  selector: 'app-manage-article',
  templateUrl: './manage-article.component.html',
  styleUrls: ['./manage-article.component.css']
})
export class ManageArticleComponent implements OnInit {
  public article:any;
  public url!:string;
  public cmt:any;
  constructor(private service: EditorArticleService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let slug= this.route.snapshot.paramMap.get('slug');
    this.service.getArticle(slug).subscribe((data:any)=>{
      console.log("data get ar", data);
      this.article=data.article;
      this.url= data.article.author.image;
    })
  }
  postCmt(slug:string){
    this.service.postCmt(this.cmt,slug).subscribe((data)=>console.log(data,"success"));
  }
  editAr(slugvalue:string){
    console.log("success", slugvalue)
    this.service.updateArticle(slugvalue);
    this.router.navigate(['/editor'])
  }
  deleteAr(slugvalue:string){
    this.service.deleteArticle(slugvalue);
    this.router.navigate(['/']);
  }
}

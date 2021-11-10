import { Component, OnInit } from '@angular/core';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/implement-services/auth.service';
import { EditorArticleService } from 'src/app/service/implement-services/editor-article.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbNavConfig]
})
export class HomeComponent implements OnInit {
  public active = 2;
  public articleArray:any = [];
  public tagArray:any = [];
  public totalArticle!:number;
  public showYourFeed:boolean = false;
  constructor(private config: NgbNavConfig, private  authService: AuthService, private editorService: EditorArticleService) {
    config.destroyOnHide = false;
    config.roles = false;
  }
  ngOnInit(): void {
    this.authService.getArticles().subscribe((data:any)=>{
      this.totalArticle = data.articles.length;
    })
    this.showYourFeed =  this.authService.isLoggedIn();
    this.authService.getArticlesPerPage(0).subscribe((data:any)=>{
      this.articleArray = data.articles;
    })



    this.authService.getTags().subscribe((data:any)=>{
      this.tagArray = data.tags;
    })
  }
  handlePagination(value:number){
    this.authService.getArticlesPerPage((value-1)*5).subscribe((data:any)=>{
      this.articleArray = data.articles;

    })

  }
}

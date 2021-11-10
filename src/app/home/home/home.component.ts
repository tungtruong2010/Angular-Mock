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
  public articleArray:any = [];
  public tagArray:any = [];
  public showYourFeed:boolean = false;
  constructor(private config: NgbNavConfig, private  authService: AuthService, private editorService: EditorArticleService) {
    config.destroyOnHide = false;
    config.roles = false;
  }
  ngOnInit(): void {
    this.showYourFeed =  this.authService.isLoggedIn();
    this.authService.getArticles(0).subscribe((data:any)=>{
      this.articleArray = data.articles;
    })



    this.authService.getTags().subscribe((data:any)=>{
      this.tagArray = data.tags;
    })
  }
  handlePagination(value:number){
    this.authService.getArticles((value-1)*5).subscribe((data:any)=>{
      this.articleArray = data.articles;

    })

  }
}

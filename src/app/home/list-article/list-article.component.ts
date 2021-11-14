import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/implement-services/auth.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  public articleArray:any = [];
  public totalArticle!:number;
  public naviName!:string;
  public tagArray:any = [];

  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {

    this.naviName = this.route.url.split('/')[1];
    let currentUser = localStorage.getItem("currentUser");

    this.authService.getTags().subscribe((data:any)=>{
      this.tagArray = data.tags;
    })

    if(this.route.url.split('/')[1] =='yourfeed'){
      this.authService.sendTagName.emit('yourfeed');

      this.authService.getArticlesFeed().subscribe((data:any)=>{
        this.totalArticle = data.articles.length;
      })
      this.authService.getArticlesFeedPerPage(0).subscribe((data:any)=>{
        this.articleArray = data.articles;
      })
    }
    if(this.route.url.split('/')[1] =='global'){
      this.authService.sendTagName.emit('global');

      this.authService.getArticles().subscribe((data:any)=>{

        this.totalArticle = data.articlesCount;
      })
      this.authService.getArticlesPerPage(0).subscribe((data:any)=>{
        this.articleArray = data.articles;

      })
    }
    if(this.route.url.split('/')[1] !='global'&&this.route.url.split('/')[1] !='global'){
      this.authService.sendTagName.emit(this.route.url.split('/')[1]);

      this.authService.getArticlesbyTag(this.route.url.split('/')[1]).subscribe((data:any)=>{
        this.totalArticle = data.articlesCount;
      })
      this.authService.getArticlesbyTagPerPage(this.route.url.split('/')[1],0).subscribe((data:any)=>{
        this.articleArray = data.articles;
      })
    }
  }
  renderByTag(tagName:string){
    let currentUser = localStorage.getItem("currentUser");
    this.authService.sendTagName.emit(tagName);

    this.authService.getArticlesbyTag(tagName).subscribe((data:any)=>{
      this.totalArticle = data.articlesCount;
    })
    this.authService.getArticlesbyTagPerPage(tagName,0).subscribe((data:any)=>{
      console.log('tag', data);

      this.articleArray = data.articles;
    })

  }
  handlePagination(value:number){
    if(this.route.url.split('/')[1] =='yourfeed'){

      this.authService.getArticlesFeedPerPage((value - 1)*5).subscribe((data:any)=>{

        this.articleArray = data.articles;


      })
    }
    if(this.route.url.split('/')[1] =='global'){

      this.authService.getArticlesPerPage((value-1)*5).subscribe((data:any)=>{
        this.articleArray = data.articles;

      })
    }
    if(this.route.url.split('/')[1] !='global'&&this.route.url.split('/')[1] !='yourfeed'){
      console.log('next');

      this.authService.getArticlesbyTagPerPage(this.route.url.split('/')[1],(value-1)*5).subscribe((data:any)=>{
        this.articleArray = data.articles;

      })
    }


  }


}

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
  public tagArray:any = [];
  public naviName!:string;

  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.naviName = this.route.url.split('/')[1];
    let currentUser = localStorage.getItem("currentUser");
    console.log('init');

    if(this.route.url.split('/')[1] =='yourfeed'){

      this.authService.getArticlesbyUser(currentUser).subscribe((data:any)=>{

        this.articleArray = data.articles;
        this.totalArticle = data.articles.length;


      })
    }
    console.log(this.route.url.split('/')[2]);

    if(this.route.url.split('/')[1] =='global'&&this.route.url.split('/')[2]==undefined){
      this.authService.getArticlesPerPage(0).subscribe((data:any)=>{
        this.articleArray = data.articles;
      })
    }else{
      this.authService.getArticlesbyTag(this.route.url.split('/')[2]).subscribe((data:any)=>{
        this.articleArray = data.articles;


      })
    }

    this.authService.getArticles().subscribe((data:any)=>{
      this.totalArticle = data.articles.length;
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
  renderByTag(tagName:string){
        let currentUser = localStorage.getItem("currentUser");

        if(this.route.url.split('/')[1] =='yourfeed'){
          this.authService.getArticlesbyUserAndTag(currentUser, tagName).subscribe((data:any)=>{

            this.articleArray = data.articles;
            this.totalArticle = data.articles.length;

          })

        }
        if(this.route.url.split('/')[1] =='global'){
          console.log('tag glo');

          this.authService.getArticlesbyTag(tagName).subscribe((data:any)=>{
            this.articleArray = data.articles;


          })
        }
  }

}

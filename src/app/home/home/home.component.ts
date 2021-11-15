import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public showYourFeed:boolean = false;
  public tagName:any = '';

  constructor(private config: NgbNavConfig,
    private  authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private editorService: EditorArticleService) {
    config.destroyOnHide = false;
    config.roles = false;
  }
  ngOnInit(): void {
    if(this.router.url.split('/')[1]=='yourfeed'){
      this.active = 1;
    }
    if(this.router.url.split('/')[1]=='global'){
      this.active = 2;
    }
    if(this.router.url.split('/')[1]!='yourfeed'&&this.router.url.split('/')[1]!='global'){
      this.active = 3;
    }

    this.showYourFeed =  this.authService.isLoggedIn();
    this.authService.sendTagName.subscribe((tagName:any)=>{
      console.log(tagName);
      if(tagName =='global'||tagName=='yourfeed'){

        this.tagName = '';
      }else{
        this.tagName = '#'+tagName;

      }
    })
  }

  setNavName(){

  }

}

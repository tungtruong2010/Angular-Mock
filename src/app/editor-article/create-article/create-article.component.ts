import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditorArticleService } from 'src/app/service/implement-services/editor-article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  public tag!: string;
  public title!:string;
  public maincontent!:string;
  public markdown!:string;

  public tagList:any=[];
  public toggle:Boolean=false;
  public slug!:string;
  constructor(public service: EditorArticleService, private router: Router) { }

  ngOnInit(): void {
    this.service.editvalue.subscribe((data:any)=>{
      console.log("dataEdit",data);
      this.slug=data;
      this.service.getArticle(data).subscribe((article:any)=>{
        console.log(article);
        this.toggle=true;
        this.title=article.article.title;
        this.maincontent= article.article.description;
        this.markdown= article.article.body;
        this.tagList=article.article.tagList;
      })
    })
  }
  getTag(tagValue:string){
    this.tagList.push(tagValue);
    this.tag='';
    console.log(this.tagList);
    
  }
  publishArticle(title:string,maincontent:string,markdown:string){
    this.service.createArticle(title,maincontent,markdown,this.tagList).subscribe((data:any)=>{
      console.log(data);
      //console.log(data.slug);
      this.router.navigate(['/editor'+`/${data.article.slug}`])
    });
  }
  update(title:string,maincontent:string,markdown:string){

    this.service.ChangeUpdateArticle(title,maincontent,markdown,this.tagList,this.slug).subscribe((data:any)=>{
      console.log("update success");
      this.router.navigate(['/editor'+`/${data.article.slug}`])
    })
  }
  deletetag(e:any){
    console.log("deltag");
    let arrayTemp:any=[];
    this.tagList.forEach((element:any,index:any) => {
      if(element!==e){
        arrayTemp.push(element);
      }
    });
    // if(arrayTemp.length!=0){
       this.tagList=arrayTemp;   
    console.log(this.tagList)
  }


}

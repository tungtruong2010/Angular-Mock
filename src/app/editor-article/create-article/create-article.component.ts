import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdEditorOption, UploadResult } from 'ngx-markdown-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditorArticleService } from 'src/app/service/implement-services/editor-article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit, OnDestroy {
  public tag!: string;
  public title!:string;
  public maincontent!:string;
  public markdown!:string;

  public tagList:any=["Angular","HTML"];

  public toggle:Boolean=false;
  public showFault:Boolean=false

  public publish:FormGroup;

  public slug!:string;
  public options: MdEditorOption = {
    showPreviewPanel: false,
    enablePreviewContentClick: false,
    resizable: true,
  };
  public content!: string;
  public mode: string = "editor";
  constructor(public service: EditorArticleService, private router: Router, private spinner: NgxSpinnerService) {
    //this.service.editvalue.unsubscribe();
    this.preRender = this.preRender.bind(this);
    this.postRender = this.postRender.bind(this);

    this.publish= new FormGroup({});
    this.publish.addControl('title', new FormControl(null,
      [Validators.required,]
    ));
    this.publish.addControl('maincontent', new FormControl(null,
      [Validators.required,]
    ));
    this.publish.addControl('content', new FormControl(null));
    this.publish.addControl('tagList', new FormControl(null));
  }

  ngOnInit(): void {
    let contentArr = ["# Hello, Markdown Example!"];
    contentArr.push("- Click EYE icon to see Preview");
    contentArr.push("- test");
    this.service.editvalue.subscribe((data:any)=>{
      console.log("dataEdit",data);
      if(data!='false'){
        this.slug=data;
        this.service.getArticle(data).subscribe((article:any)=>{
          console.log(article);
          this.toggle=true;
          this.publish.get('title')?.patchValue(article?.article?.title);
          this.publish.get('maincontent')?.patchValue(article?.article?.description);
          this.publish.get('content')?.patchValue(article?.article?.body);
          let tagLists:any= [];
          article?.article?.tagList.forEach((element:any) => {
            tagLists.push({display: element, value: element})
          });
          this.publish.get('tagList')?.patchValue(tagLists);
        })
      }
      //this.content = contentArr.join("\r\n");
      this.publish.get('content')?.patchValue(contentArr.join("\r\n"));
    })
    this.publish.get('tagList')?.patchValue(this.tagList);
    
  }
  onTagEdited(e:any){
    console.log("eeeee",e)
  }
  getTag(tagValue:string){
    this.tagList.push(tagValue);
    this.tag='';
    console.log(this.tagList);
    
  }
  publishArticle(){
    this.spinner.show();
    let tagLists:any= [];
    this.publish.get('tagList')?.value.forEach((element:any) => {
      console.log("element taglis",element);
      
      tagLists.push(element.value)
    });
    //console.log(tagLists)
    
    if(this.publish.get('title')?.value!=null&&this.publish.get('maincontent')?.value !=null&&this.publish.get('title')?.value!=''&&this.publish.get('maincontent')?.value !=''){
      this.service.createArticle(this.publish.get('title')?.value,this.publish.get('maincontent')?.value,this.publish.get('content')?.value,tagLists).subscribe((data:any)=>{
        //console.log("publish", data);
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          console.log("hideeeeee");
          this.router.navigate(['/editor'+`/${data.article.slug}`])
        }, 1000);
        
        
      },
      (err)=>{
        console.log("loi roi",err)
        if(err.status==500){
          this.showFault=true;
        }
      }
      );
      this.showFault=true;
    }else{
      this.spinner.hide();
      this.showFault=true;
    }
    
  }
  update(){
    this.spinner.show();
    let tagLists:any= [];
    this.publish.get('tagList')?.value.forEach((element:any) => {
      console.log("element", element);
      tagLists.push(element.value)
    });
    this.service.ChangeUpdateArticle(this.publish.get('title')?.value,this.publish.get('maincontent')?.value,this.publish.get('content')?.value,tagLists,this.slug).subscribe((data:any)=>{
      console.log("update success");
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
        console.log("hideeeeee");
        this.router.navigate(['/editor'+`/${data.article.slug}`])
      }, 1000);
    })
  }


  togglePreviewPanel() {
    this.options.showPreviewPanel = !this.options.showPreviewPanel;
    this.options = Object.assign({}, this.options);
  }
  preRender(mdContent:any) {
    console.log(`preRender fired`);
    return mdContent;
  }
  postRender(html:any) {
    console.log(`postRender fired`);
    // return '<h1>Test</h1>';
    return html;
  }

  ngOnDestroy(){
    console.log(12);
    this.title=''
    this.maincontent=''
    this.markdown=''
    this.tagList='';
    this.toggle=false;
    this.service.updateArticle('false');
  }

}

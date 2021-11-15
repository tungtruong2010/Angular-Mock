import { Component, OnChanges, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/implement-services/auth.service';
import { EditorArticleService } from 'src/app/service/implement-services/editor-article.service';

@Component({
  selector: 'app-manage-article',
  templateUrl: './manage-article.component.html',
  styleUrls: ['./manage-article.component.css'],
})
export class ManageArticleComponent implements OnInit, OnChanges {
  public article:any;
  public markdown!:HTMLElement;
  public url!:string;
  public cmt:any;
  public follow:any;
  public listCmt:any=[];
  private modalRef!: NgbModalRef;
  public followingName!:Boolean;
  public favorite!:Boolean;

  constructor(
    private _modalService: NgbModal,
    private service: EditorArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private authsrv: AuthService,
    private toastsrv: ToastrService
  ) { }

  ngOnInit(): void {
    const showdown  = require('showdown'),
    converter = new showdown.Converter();
    let currentUser = localStorage.getItem("currentUser");

    this.follow= this.authsrv?.user?.username;


    let slug= this.route.snapshot.paramMap.get('slug');
    this.service.getArticle(slug).subscribe((data:any)=>{
      console.log("data get ar", data);
      this.article=data.article;
      this.markdown=converter.makeHtml(data.article.body);
      //body?.innerHTML=(converter.makeHtml(data.article.body))asH;
      this.url= data.article.author.image;
      this.followingName=data.article.author.following;
      this.favorite=data.article.favorited
    });
    this.service.getCmt(slug).subscribe((data:any)=>{
      this.listCmt=data.comments;
    })
    if(currentUser!=null){
      console.log(currentUser);

      this.follow= currentUser;

    }
  }
  ngOnChanges(){
    console.log("this.listCmt",this.listCmt);

  }
  postCmt(slug:string){
    if(this.authsrv.loggedIn){
      this.service.postCmt(this.cmt,slug).subscribe((data)=>{
        //console.log(data,"success");
        let slug= this.route.snapshot.paramMap.get('slug');
        this.service.getCmt(slug).subscribe((data:any)=>{
          this.listCmt=data.comments;
          this.cmt='';
        })
    });
    }
    else {
      this.toastsrv.error('You must login first !')
      setTimeout(() => {
        this.router.navigate(['/login']);
      },1800)
    }
  }
  deleteList(slug:any,e:any){
    if(this.authsrv.loggedIn){
      this.service.deleteCmt(slug,e).subscribe((data:any)=>{
        this.service.getCmt(slug).subscribe((data:any)=>{
          this.listCmt=data.comments;
          this.cmt='';
        })
      })
    }else {
      this.toastsrv.error('You must login first !')
      setTimeout(() => {
        this.router.navigate(['/login']);
      },1800)
    }
  }
  editAr(slugvalue:string){
    console.log("success", slugvalue)
    this.service.updateArticle(slugvalue);
    this.router.navigate(['/editor'])
  }
  deleteAr(name: string,slugvalue:string){
    this.modalRef=this._modalService.open(MODALS[name]);
    //this._modalService.activeInstances.subscribe(data=>console.log(data));
    this.modalRef.result.then((result) => {
      //console.log( `Closed with: ${result}`);
      this.service.deleteArticle(slugvalue).subscribe(data=>{
        this.router.navigate(['/']);
      });
    },(reason) => {
      console.log(`Dismissed ${reason}`);
    })

  }
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;
  followName(name:any){
    if(this.authsrv.loggedIn){
      this.followingName=true
      this.service.follow(name).subscribe(data=>console.log(data))
    }else{
      this.toastsrv.error('You must login first !')
      setTimeout(() => {
        this.router.navigate(['/login']);
      },1800)
    }

  }
  unfollowName(username:any){
    if(this.authsrv.loggedIn){
      this.followingName=false
    this.service.unfollow(username).subscribe(data=>console.log(data))
    }else{
      this.toastsrv.error('You must login first !')
      setTimeout(() => {
        this.router.navigate(['/login']);
      },1800)
    }

  }
  fav(slug:any){
    if(this.authsrv.loggedIn){
      this.favorite=true
      this.service.fav(slug).subscribe(data=>console.log(data))
    }else{
      this.toastsrv.error('You must login first !')
      setTimeout(() => {
        this.router.navigate(['/login']);
      },1800)
    }

  }
  unfav(slug:any){
    if(this.authsrv.loggedIn){
         this.favorite=false
    this.service.unfav(slug).subscribe(data=>console.log(data))
    }else{
      this.toastsrv.error('You must login first !')
      setTimeout(() => {
        this.router.navigate(['/login']);
      },1800)
    }

  }
}
@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Article deletion</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"this"</span> article?</strong></p>
    <p>All information associated to this article will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,

})
export class NgbdModalConfirmAutofocus{
  constructor(public modal: NgbActiveModal) {}
  ngOnDestroy(){
    //this.check.result.then(data=>console.log("result dataa", data))
    // this.check.closed.subscribe(data=>console.log("okkkkkkkkkkkkkkk",data));
    // this.check.dismissed.subscribe(data=>console.log("cancellllllll",data));
  }
}
const MODALS: {[name: string]: Type<any>} = {
  autofocus: NgbdModalConfirmAutofocus
};

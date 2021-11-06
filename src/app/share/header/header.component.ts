import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggin:boolean = true;
  public src:string = 'https://picsum.photos/id/237/200/300';
  public account_name:string = 'User Account';
  constructor() { }

  ngOnInit(): void {
  }

}

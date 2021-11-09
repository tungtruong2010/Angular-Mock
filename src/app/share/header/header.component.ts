import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggin:boolean = true; // lấy trạng thái isLoggin từ auth service để hiển thị header option
  public src:string = 'https://picsum.photos/id/237/200/300'; // lấy từ current user của auth service để hiển thị avatar người dùng trên header
  public account_name:string = 'nam789';// lấy từ current user của auth service để hiển thị tên người dùng trên header
  constructor() { }

  ngOnInit(): void {
  }

}

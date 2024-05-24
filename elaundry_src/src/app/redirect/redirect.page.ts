import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.page.html',
  styleUrls: ['./redirect.page.scss'],
})
export class RedirectPage implements OnInit {

  url:string=""

  constructor() { }

  ngOnInit() {
  }

  Go(){
    window.open(this.url,"_self")
  }

}

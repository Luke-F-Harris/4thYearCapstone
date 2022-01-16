import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {

  constructor(public appcomp: AppComponent) { }

  ngOnInit(): void {
  }

}

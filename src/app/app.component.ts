import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  public finalData = [];
  public currentJson = '';
  private configUrl = "https://hn.algolia.com/api/v1/search_by_date?tags=story "
  constructor(private http: HttpClient,private modalService: NgbModal){
    this.callapi();
    setInterval(()=>{
      this.callapi();
    },10000)
    
  }
  callapi(){
    this.http.get(this.configUrl).subscribe((data:any) => {
      console.log(data.hits);
      this.finalData = data.hits
   });
  }
  open(content,obj) {
    this.currentJson = JSON.stringify(obj);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed`);
    });
  }
}

import {Component} from '@angular/core';
import {mockDropdownData} from "./shared/constants/testing-constants";



@Component({
  selector: 'corps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mockDropdownData = mockDropdownData();

}


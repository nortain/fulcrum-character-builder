import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {Browser} from "selenium-webdriver";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: []
})
export class CoreModule { }

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CharacterSheetModule} from "./character-sheet/character-sheet.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    NgbModule.forRoot(),
    CharacterSheetModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

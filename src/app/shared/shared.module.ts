import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownComponent} from './ui/dropdown/dropdown.component';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {AttributeService} from "./attribute/attribute.service";
import {InputComponent} from './ui/input/input.component';
import {SubthemePipe} from './theme-points/subthemes/subtheme.pipe';
import {CastleCasePipe} from './pipes/castle-case.pipe';
import {ConfirmationComponent} from './ui/confirmation/confirmation.component';
import {AreaOfEffectService} from "./area-of-effect/area-of-effect.service";
import {ActionService} from "./action/action.service";
import {DiceService} from "./character/dice/dice.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ],
  declarations: [DropdownComponent, InputComponent, SubthemePipe, CastleCasePipe, ConfirmationComponent],
  providers: [AttributeService, AreaOfEffectService, ActionService, DiceService],
  exports: [CommonModule, FormsModule, DropdownComponent, InputComponent, SubthemePipe, CastleCasePipe, ConfirmationComponent],
  entryComponents: [ConfirmationComponent]
})
export class SharedModule {
}

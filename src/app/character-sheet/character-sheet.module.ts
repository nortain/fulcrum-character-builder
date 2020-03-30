import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {CharacterAttributesComponent} from './character-attributes/character-attributes.component';
import {CharacterSheetComponent} from './character-sheet.component';
import {CharacterThemePointsComponent} from './character-theme-points/character-theme-points.component';
import {SubthemeComponent} from "./character-subtheme-modal/subthemes/subtheme.component";
import { CharacterSubthemeModalComponent } from './character-subtheme-modal/character-subthemes/character-subtheme-modal.component';
import { CharacterMagicSubthemeComponent } from './character-subtheme-modal/character-magic-subtheme/character-magic-subtheme.component';
import { SpellSelectionComponent } from './character-subtheme-modal/character-magic-subtheme/spell-selection/spell-selection.component';



@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [CharacterAttributesComponent, CharacterSheetComponent, CharacterThemePointsComponent, SubthemeComponent, CharacterSubthemeModalComponent, CharacterMagicSubthemeComponent, SpellSelectionComponent],
  entryComponents: [CharacterSubthemeModalComponent]

})
export class CharacterSheetModule {
}

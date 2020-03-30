import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Subtheme} from "../../../../shared/theme-points/subthemes/subtheme";
import {ThemeStrength} from "../../../../shared/theme-points/theme-strength.enum";
import {MagicType, SpellSelectionType} from "../magic-type.enum";
import {Spell} from "../../../../shared/spells/spell";
import {Feature, SpecialPower, SUBTHEME_BONUS} from "../../../../shared/constants/constants";
import {ActionType} from "../../../../shared/action/action-type.enum";
import {AreaOfEffectService} from "../../../../shared/area-of-effect/area-of-effect.service";
import {ActionService} from "../../../../shared/action/action.service";
import {Dice} from "../../../../shared/character/dice/dice";
import {DiceSize} from "../../../../shared/character/dice/dice-size.enum";
import {LevelRange} from "../../../../shared/spells/enums/level-range.enum";
import {DiceService} from "../../../../shared/character/dice/dice.service";

/**
 * This component is used to select powers or spells for the character
 */
@Component({
  selector: 'corps-spell-selection',
  templateUrl: './spell-selection.component.html',
  styleUrls: ['./spell-selection.component.css']
})
export class SpellSelectionComponent implements OnInit, OnChanges {

  /**
   * loads in the character subtheme
   */
  @Input() subtheme: Subtheme;
  /**
   * loads in if the character has a general theme point
   */
  @Input() generalThemePoint: ThemeStrength;
  /**
   * load in previous selected spells if any
   */
  @Input() previouslySelectedSpell: Spell[];
  /**
   * number of spells a character can select
   */
  @Input() numberOfSpellsToSelect: number;
  /**
   * This tells the component where it is getting it's spell data from
   */
  @Input() propertyType: SpellSelectionType;
  /**
   * This is the text value of how we are referring to this property, if no value is given then we default to Spell
   */
  @Input() propertyName: string;
  /**
   * output the subtheme and the selected spells with it
   */
  @Output() submitter: EventEmitter<{ subtheme: Subtheme, spells: Spell[] }>;

  /**
   * toggle to determine if content is displayed
   */
  selectionDisplayToggle: boolean;

  /**
   * maintain an array of spells that are selected
   */
  selectedSpells: Spell[];
  /**
   * maintain an array of which spells are open
   */
  openSpells: Spell[];
  actionType = ActionType;

  constructor(private aoeService: AreaOfEffectService, private actionService: ActionService, private diceService: DiceService) {
    this.selectionDisplayToggle = false;
    this.resetSpellSelection();
  }

  ngOnInit() {
    if (!this.propertyName) {
      this.propertyName = "Spell";
    }
    if (this.previouslySelectedSpell && this.previouslySelectedSpell.length > 0) {
      if (this.previouslySelectedSpell[0].sphereName === this.subtheme.subthemeName) {
        this.selectedSpells = this.previouslySelectedSpell;
      }
    }
  }

  ngOnChanges() {
    console.log("Something was changed");
  }

  /**
   * this should look at all user choices for a magic subtheme and return true if any have been made and false otherwise.  A user choice in this case is selecting a build option, a spell or selecting spells.
   * @returns {boolean}
   */
  isThisDirty(): boolean {
    const dirty = this.selectedSpells.length > 0;
    return dirty;
  }

  /**
   * clears out all selected and open spells
   */
  resetSpellSelection() {
    this.selectedSpells = [];
    this.openSpells = [];
  }

  displaySpells() {
    this.selectionDisplayToggle = !this.selectionDisplayToggle;
  }

  isSubthemeSelected() {
    return this.subtheme.themeStrength !== ThemeStrength.None;
  }


  openSpell(spell: Spell) {
    const index = this.findIndexOfSpellByName(spell, this.openSpells);
    if (index > -1) {
      this.openSpells.splice(index, 1);
    } else {
      this.openSpells.push(spell);
    }
  }

  isSpellOpen(spell: Spell) {
    return this.findIndexOfSpellByName(spell, this.openSpells) > -1;
  }

  isSpellSelected(spell: Spell) {
    return this.findIndexOfSpellByName(spell, this.selectedSpells) > -1;
  }

  getCastActionString(actionType) {
    return this.actionService.getActionAsString(actionType);
  }

  getAOEString(spell: Spell) {
    return this.aoeService.displayAOE(spell.areaOfEffect);
  }

  selectSpell(spell: Spell) {
    if (this.selectedSpells.length < this.numberOfSpellsToSelect) {
      this.selectedSpells.push(spell);
    } else {
      const index = this.findIndexOfSpellByName(spell, this.selectedSpells);
      if (index > -1) {
        this.selectedSpells.splice(index, 1);
      }
    }
  }

  /**
   * Gets text from the SpellSphere interface
   * @param {MagicType} propertyName
   * @returns {string}
   */
  getMagicText(propertyName: SpellSelectionType): Spell | Spell[] | SpecialPower {
    return SUBTHEME_BONUS[this.subtheme.subthemeName][propertyName];
  }

  getSpellData(): Spell[] {
    const spellsArray = this.getMagicText(this.propertyType);
    let result = [];
    if (spellsArray instanceof Array) {
      result = spellsArray;
    } else if (spellsArray instanceof SpecialPower || !!spellsArray["powers"]) {
      result = spellsArray["powers"];
    } else if (spellsArray instanceof Spell || !!spellsArray["sphereName"]) {
      result = [spellsArray];
    }
    return result;
  }

  getSpellRoll(minValue: number, maxValue: number, dieSize: DiceSize, levelRange: LevelRange): string {
    const spellDie = new Dice();
    return spellDie.printRoll();
  }

  private findIndexOfSpellByName(element: Spell, array: Spell[]): number {
    for (const index of Object.keys(array)) {
      if (element.name === array[index].name) {
        return parseInt(index, 10);
      }
    }
    return -1;
  }
}

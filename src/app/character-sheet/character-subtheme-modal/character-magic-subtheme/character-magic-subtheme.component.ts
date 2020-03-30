import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Subtheme} from "../../../shared/theme-points/subthemes/subtheme";
import {Feature, Knack, SUBTHEME_BONUS} from "../../../shared/constants/constants";
import {MagicType, SpellSelectionType} from "./magic-type.enum";
import {ThemeStrength} from "../../../shared/theme-points/theme-strength.enum";
import {SubthemeType} from "../../../shared/theme-points/subthemes/subtheme-types.enum";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationComponent} from "../../../shared/ui/confirmation/confirmation.component";

@Component({
  selector: 'fulcrum-character-magic-subtheme',
  templateUrl: './character-magic-subtheme.component.html',
  styleUrls: ['./character-magic-subtheme.component.css']
})
export class CharacterMagicSubthemeComponent implements OnInit, OnChanges {

  @Input() subtheme: Subtheme;
  @Input() generalThemePoint: ThemeStrength;
  @Input() previouslySelectedKnacks: Knack[];
  @Input() subthemePointCap: number;
  @Output() submitter: EventEmitter<{ subtheme: Subtheme, knacks: Knack[] }>;

  magicType = MagicType;
  spellSelectionType = SpellSelectionType;
  /**
   * a toggle switch to determine if knacks are being displayed or not
   */
  knackDisplayToggle: boolean;
  /**
   * the number of knacks a character can select
   */
  numberOfKnacksToSelect: number;
  /**
   * maintains an array of knacks that have been selected
   */
  selectedKnacks: Knack[];
  /**
   * maintains an array of knacks that are toggled open
   */
  openKnacks: Knack[];

  constructor(private modalService: NgbModal, private ref: ChangeDetectorRef) {
    this.resetSubtheme();
    this.knackDisplayToggle = false;
    this.submitter = new EventEmitter<{ subtheme: Subtheme, knacks: Knack[] }>();
  }

  ngOnInit() {
    if (this.previouslySelectedKnacks && this.previouslySelectedKnacks.length > 0) {
      if (this.previouslySelectedKnacks[0].subthemeName === this.subtheme.subthemeName) {
        this.selectedKnacks = this.previouslySelectedKnacks;
      }
    }
    this.determineNumberOfSelectableKnacks();
  }

  ngOnChanges() {
    this.determineNumberOfSelectableKnacks();
  }

  /**
   * this should look at all user choices for a magic subtheme and return true if any have been made and false otherwise.  A user choice in this case is selecting a build option, a knack or selecting spells.
   * @returns {boolean}
   */
  isThisDirty(): boolean {
    const dirty = this.selectedKnacks.length > 0;
    return dirty;
  }

  resetSubtheme() {
    this.selectedKnacks = [];
    this.openKnacks = [];
  }

  displayKnacks() {
    this.knackDisplayToggle = !this.knackDisplayToggle;
  }

  isSubthemeSelected() {
    return this.subtheme.themeStrength !== ThemeStrength.None;
  }

  selectSubtheme() {
    if (!this.isSubthemeSelected() && this.subthemePointCap > 0) {
      this.subtheme = new Subtheme(SubthemeType[this.subtheme.subthemeName], this.subtheme.maxThemeStrength);
      this.submitter.emit({
        subtheme: this.subtheme,
        knacks: this.selectedKnacks
      });
    } else if (this.isSubthemeSelected()) {
      if (this.isThisDirty()) {
        const options = {
          backdrop: "static",
          size: "sm",
          centered: true
        } as NgbModalOptions;
        const modalRef = this.modalService.open(ConfirmationComponent, options);
        modalRef.componentInstance.bodyText = ["You will lose all your changes for this subtheme if you deselect it.  Do you wish to continue?"];
        modalRef.result.then((result) => {
          if (result) {
            this.resetSubtheme();
            this.subtheme = new Subtheme(SubthemeType[this.subtheme.subthemeName]); // make new subtheme with 0 strength
            this.submitter.emit({
              subtheme: this.subtheme,
              knacks: this.selectedKnacks
            });
            this.ref.detectChanges(); // needed cause we are resolving a promise THEN updating UI
          }
        }, (rejected) => {
          console.error("The user rejected the confirmation modal: ", rejected);
        });
      } else { // if the form is not dirty just deselect the damn thing
        this.resetSubtheme();
        this.subtheme = new Subtheme(SubthemeType[this.subtheme.subthemeName]); // make new subtheme with 0 strength
        this.submitter.emit({
          subtheme: this.subtheme,
          knacks: this.selectedKnacks
        });
      }
    }// else do nothing
  }

  openKnack(knack: Knack) {
    const index = this.findIndexOfKnackByName(knack, this.openKnacks);
    if (index > -1) {
      this.openKnacks.splice(index, 1);
    } else {
      this.openKnacks.push(knack);
    }
  }

  isKnackOpen(knack: Knack) {
    return this.findIndexOfKnackByName(knack, this.openKnacks) > -1;
  }

  isKnackSelected(knack: Knack) {
    return this.findIndexOfKnackByName(knack, this.selectedKnacks) > -1;
  }

  selectKnack(knack: Knack) {
    if (this.selectedKnacks.length < this.numberOfKnacksToSelect) {
      this.selectedKnacks.push(knack);
    } else {
      const index = this.findIndexOfKnackByName(knack, this.selectedKnacks);
      if (index > -1) {
        this.selectedKnacks.splice(index, 1);
      }
    }
  }

  getOverviewText(): string {
    return SUBTHEME_BONUS[this.subtheme.subthemeName].Overview;
  }

  /**
   * Gets text from the SpellSphere interface
   * @param {MagicType} propertyName
   * @returns {string}
   */
  getMagicText(propertyName: MagicType): Feature {
    return SUBTHEME_BONUS[this.subtheme.subthemeName][propertyName];
  }

  getKnackData(knackName: string): number[] {
    const knacksObject = this.getMagicText(this.magicType.ImplementKnacksData);
    return knacksObject[knackName];
  }

  getKnackText(): Knack[] {
    const knacksObject = this.getMagicText(this.magicType.ImplementKnacks);
    const knacksArray = Object.keys(knacksObject);
    const result = [];
    for (const knack of knacksArray) {
      result.push({
        name: knack,
        text: knacksObject[knack],
        subthemeName: this.subtheme.subthemeName
      });
    }
    return result;
  }

  private findIndexOfKnackByName(element: Knack, array: Knack[]): number {
    for (const index of Object.keys(array)) {
      if (element.name === array[index].name) {
        return parseInt(index, 10);
      }
    }
    return -1;
  }

  private determineNumberOfSelectableKnacks() {
    this.numberOfKnacksToSelect = 0;
    if (this.generalThemePoint > 0) {
      this.numberOfKnacksToSelect++;
    }
    if (this.subtheme.maxThemeStrength === ThemeStrength.Greater) {
      this.numberOfKnacksToSelect++;
    }
  }
}



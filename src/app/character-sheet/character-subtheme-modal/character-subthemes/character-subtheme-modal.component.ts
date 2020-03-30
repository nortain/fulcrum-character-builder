import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Subtheme} from "../../../shared/theme-points/subthemes/subtheme";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SubthemeContainer} from "../../../shared/theme-points/subthemes/subtheme-container";
import {ThemeType} from "../../../shared/theme-points/theme-type.enum";
import {Knack} from "../../../shared/constants/constants";


@Component({
  selector: 'fulcrum-character-subtheme-container',
  templateUrl: './character-subtheme-modal.component.html',
  styleUrls: ['./character-subtheme-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterSubthemeModalComponent implements OnInit {

  @Input() subthemePoints: SubthemeContainer;
  subthemeButtonsArray: Subtheme[];
  themeType = ThemeType;
  selectedSubtheme: Subtheme;
  // this feels like a hacky way of dealing with the model not updating but each time a new subtheme is selected these are to be toggled back forth.
  subthemeToggle: boolean;


  constructor(private activeModal: NgbActiveModal) {
    this.subthemeToggle = true;
  }

  ngOnInit() {
    console.log("Out subthemePoints container at init of modal", this.subthemePoints);
    this.getAllPossibleSubthemes();
    this.selectedSubtheme = this.subthemeButtonsArray[0];
  }

  /**
   * gets all available subthemes based on potentally available theme points.  Thus if the original themepoints container has 1 or more theme points in combat, stealth or magic, each will respectively return all subthemes that could potentally be selected.  If subtheme points have already been assigned to aparticular subtheme then this should be reflected in the array that gets assigned to subthemeButtonsArray
   *
   */
  getAllPossibleSubthemes() {

    const subthemeObject = this.subthemePoints.buildSubthemeObject();
    let result = [];
    result = this.pruneSubthemes(subthemeObject.combat, result);
    result = this.pruneSubthemes(subthemeObject.stealth, result);
    result = this.pruneSubthemes(subthemeObject.magic, result);

    this.subthemeButtonsArray = result;
  }

  private pruneSubthemes(subArray: Subtheme[], resultArray: Subtheme[]) {
    if (subArray && subArray.length > 0) {
      resultArray = [...resultArray, ...subArray];
    }
    return resultArray;
  }

  getAssignedSubthemes(): number {
    return this.selectedSubtheme.themeStrength;
  }

  updateSubtheme(updatedSubtheme: Subtheme) {
    for (const sub of this.subthemeButtonsArray) {
      if (sub.subthemeName === updatedSubtheme.subthemeName && sub.themeStrength !== updatedSubtheme.themeStrength) {
        const index = this.subthemeButtonsArray.indexOf(sub);
        this.subthemeButtonsArray[index] = updatedSubtheme;
        this.subthemePoints.assignSubtheme(updatedSubtheme);
        this.selectedSubtheme = updatedSubtheme;
        break;
      }
    }
  }

  updateMagicSubtheme(updatedMagicSubtheme: { subtheme: Subtheme, knacks: Knack[] }) {
    this.subthemePoints.spellKnacks = updatedMagicSubtheme.knacks;
    this.updateSubtheme(updatedMagicSubtheme.subtheme);
  }

  /**
   * this will get the subtheme cap point which is to say the maximum number of theme points that can the currently selected subtheme
   * @returns {number}
   */
  getSubthemePointCap(): number {
    const themeType = ThemeType[this.selectedSubtheme.themeType].toLowerCase();
    let maximumSubthemeStrength = this.subthemePoints.themePoints[themeType].getStrength();
    for (const sub of this.subthemeButtonsArray) {
      if (sub.subthemeName !== this.selectedSubtheme.subthemeName
        && sub.themeType === this.selectedSubtheme.themeType) {
        maximumSubthemeStrength -= sub.themeStrength;
      }
    }
    return maximumSubthemeStrength;
  }


  selectSubtheme(selectedSubtheme: Subtheme) {
    this.selectedSubtheme = selectedSubtheme;
    this.subthemeToggle = !this.subthemeToggle;
  }

  close() {
    this.activeModal.close(this.subthemePoints);
  }

  dismiss() {
    this.activeModal.dismiss("User Cancelled");
  }


}

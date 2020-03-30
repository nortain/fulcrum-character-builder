import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subtheme} from "../../../shared/theme-points/subthemes/subtheme";
import {DropdownValueObject} from "../../../shared/ui/dropdown/dropdown-value-object";
import {AttributeService} from "../../../shared/attribute/attribute.service";
import {SubthemeType} from "../../../shared/theme-points/subthemes/subtheme-types.enum";
import {ThemeType} from "../../../shared/theme-points/theme-type.enum";
import {STARTING_THEME_POINTS, SUBTHEME_BONUS} from "../../../shared/constants/constants";
import {DropdownComponent} from "../../../shared/ui/dropdown/dropdown.component";


@Component({
  selector: 'corps-subthemes',
  templateUrl: './subthemes.component.html',
  styleUrls: ['./subthemes.component.css']
})
export class SubthemeComponent implements OnInit {

  @ViewChild(DropdownComponent) dropdown: DropdownComponent;
  @Input() subtheme: Subtheme;
  @Input() assignedSubthemePoints: number; // could be between 0 and 4
  @Input() subthemePointCap: number; // could be between 0 and 3 as this is the most number of possible theme points that could be assigned
  @Output() submitter: EventEmitter<Subtheme>;


  themeType = ThemeType;


  constructor(private  attributeService: AttributeService) {
    this.submitter = new EventEmitter<Subtheme>();

  }

  ngOnInit() {

  }

  /**
   * get texts returned as an array of strings for the current subtheme from the constants SUBTHEME_BONUS constant
   * @returns {string[]}
   */
  getTextInfo(): string[] {
    return SUBTHEME_BONUS[this.subtheme.subthemeName].text;
  }

  /**
   * gets an array of arrays to represent the values that are gained from the sub theme and displayed in the subtheme component
   */
  getTableData() {
    const rows = [];
    let length = 1;
    while (length <= this.subtheme.maxThemeStrength) {
      rows.push(SUBTHEME_BONUS[this.subtheme.subthemeName][length]);
      length++;
    }
    return rows;
  }

  /**
   * takes in a object and return an array of strings that represent the keys of that object
   * @param table
   * @returns {string[]}
   */
  getRowHeader(table: object): string[] {
    const rows = Object.keys(table);
    return rows;
  }

  /**
   * takes in an object and a rowName which should be a property of that object and this returns the value of the property name in the passed in object.
   * @param table
   * @param rowName
   * @returns {any}
   */
  getRowData(table, rowName) {
    const value = table[rowName];
    return value.length === 1 ? ' ' + value : value;
  }


  loadSelectedDropdownValue(): DropdownValueObject {
    const newDD = new DropdownValueObject(this.subtheme.themeStrength);
    this.dropdown.selectDropdown(newDD);
    return newDD;
  }

  /**
   * returns a number indicating how many sub theme points are left to assign towards this particular sub theme.
   * @returns {number}
   */
  getRemainingSubthemePointsToAssign(): number {
    const total = STARTING_THEME_POINTS - this.totalAssignableSubthemePoints();
    return total - this.subtheme.themeStrength;
  }

  totalAssignableSubthemePointsForUI(): number {
    return STARTING_THEME_POINTS - this.totalAssignableSubthemePoints();
  }

  /**
   * returns the INVERSE of the total number of sub theme points that can be assigned to this sub theme. With respect to all other subthemes of the same type.  Since there are only 4 subtheme points in total this should be used to find out how many of the total 4 can be assigned.  This means if 3 can be assigned instead of returning 3 this would return 1.  If only 1 could be assigned then a 3 would returned.
   * EX: If there are 3 stealth subthemes points available and 2 are assigned to find weakness, and this is Riposte, only 1 can be assigned thus it would return 3.
   * @returns {number}
   */
  totalAssignableSubthemePoints(): number {
    let max = this.subtheme.maxThemeStrength;
    if (max < this.subthemePointCap) {
      max = STARTING_THEME_POINTS - this.subtheme.maxThemeStrength;
    } else {
      max = STARTING_THEME_POINTS - this.subthemePointCap;
    }
    let pointsAssignedElsewhere = this.assignedSubthemePoints - this.subtheme.themeStrength;
    pointsAssignedElsewhere = pointsAssignedElsewhere < max ? max : pointsAssignedElsewhere;
    return pointsAssignedElsewhere;
  }

  /**
   * assigns a new subtheme object whenever the strength value of the subtheme is changed
   * @param {DropdownValueObject} dd
   */
  reloadSubtheme(dd: DropdownValueObject) {
    this.subtheme = new Subtheme(SubthemeType[this.subtheme.subthemeName], dd.value);
    this.submitter.emit(this.subtheme);
  }

  /**
   * returns an array of dropdownvalue objects that are used to populate the subtheme modal window.  This dropdown will be responsible for assigned how many available subtheme points are assigned to this particular subtheme.
   * @returns {DropdownValueObject[]}
   */
  getDropdownValues(): DropdownValueObject[] {
    const pointsAssignedElsewhere = this.totalAssignableSubthemePoints();
    const result = this.attributeService.buildArrayAsDropdownArray(this.attributeService.getThemePointStrength(false, pointsAssignedElsewhere));
    return result;
  }


}

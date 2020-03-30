import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AttributeService} from "../../shared/attribute/attribute.service";
import {DropdownValueObject} from "../../shared/ui/dropdown/dropdown-value-object";
import {ThemePointsContainer} from "../../shared/theme-points/theme-points-container";

@Component({
  selector: 'fulcrum-character-theme-points',
  templateUrl: './character-theme-points.component.html',
  styleUrls: ['./character-theme-points.component.css']
})
export class CharacterThemePointsComponent implements OnInit {
  @Output() emitter: EventEmitter<ThemePointsContainer>;
  themeContainer: ThemePointsContainer;


  constructor(private attributeService: AttributeService) {
    this.emitter = new EventEmitter<ThemePointsContainer>();
  }

  ngOnInit() {
    this.themeContainer = new ThemePointsContainer();
  }

  getDropdownValues(themeType: string, isGeneral = false): DropdownValueObject[] {
    const result = this.attributeService.buildArrayAsDropdownArray(
      this.attributeService.getThemePointStrength(isGeneral, this.themeContainer.getOtherThemePoints(themeType))
    );
    return result;
  }

  getRemainingThemePoints(): number {
    return this.themeContainer.getTotalThemePoints();
  }

  updateThemePoints(themeType: string, themeStrength: number) {
    this.themeContainer[themeType].setStrength(themeStrength);
    this.emitter.emit(this.themeContainer);
  }

}

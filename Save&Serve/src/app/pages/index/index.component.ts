import { Component } from '@angular/core';
import { HerosectionComponent } from '../../components/herosection-component/herosection-component.component';
import { CommonModule } from '@angular/common';
import { HowworksComponent } from '../../components/howworks-component/howworks-component.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { FeatureComponent } from '../../components/feature/feature.component';
import { StadisticComponent } from '../../components/stadistic/stadistic.component';
import { ImpactComponent } from '../../components/impact/impact.component';
import { AccordionComponent } from '../../components/accordion/accordion.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule,HerosectionComponent,HowworksComponent,CarouselComponent,FeatureComponent,StadisticComponent,ImpactComponent,AccordionComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}

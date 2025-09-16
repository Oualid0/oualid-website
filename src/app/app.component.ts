import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomComponent } from './components/bottom/bottom.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { TechnologiesComponent } from './pages/technologies/technologies.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, BottomComponent,
    TimelineComponent,
    WelcomeComponent, ToolbarComponent, TechnologiesComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {

}

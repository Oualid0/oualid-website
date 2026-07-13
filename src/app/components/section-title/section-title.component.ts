import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-section-title',
    imports: [],
    templateUrl: './section-title.component.html',
})
export class SectionTitleComponent {
  @Input() label = '';
}

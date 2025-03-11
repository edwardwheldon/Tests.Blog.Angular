import { Component } from '@angular/core';
import { PostListComponent } from './components/post-list/post-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [PostListComponent]
})

export class AppComponent {
  title = 'angular-take-home-test';
}

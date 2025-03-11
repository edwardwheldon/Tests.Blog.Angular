import { Component } from '@angular/core';
import { PostListComponent } from './components/post-list/post-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterModule]
})

export class AppComponent {
  title = 'angular-take-home-test';
}

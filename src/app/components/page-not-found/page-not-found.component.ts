import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterModule],
  template: `
  <div class="page-not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a routerLink="/">Go to Home</a>
  </div>
`,
styles: [`
  .page-not-found {
    text-align: center;
    margin-top: 4rem;
  }
`]
})
export class PageNotFoundComponent {}

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts/posts.service';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { PostComponent } from '../post/post.component';
import { LoaderComponent } from '../loader/loader.component';
import { catchError, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

/**
 * Component to display the details of a single post.
 */
@Component({
  selector: 'app-post-detail',
  imports: [PostComponent, RouterModule, LoaderComponent],
  providers: [PostsService],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
  standalone: true,
})
export class PostDetailComponent implements OnInit, OnDestroy {

  private postsService = inject(PostsService);
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  post: IPost | undefined;
  loading = true;

/**
 * Initializes the component and fetches the details of a single post based on the route parameter.
 * Extracts the post ID from the route's `paramMap`, fetches the post data using `PostsService`,
 * updates the `post` and `loading` properties, and handles potential errors during data fetching.
 *
 * @see {@link ngOnDestroy} for subscription cleanup.
 * @see {@link PostsService.getPost} for the data fetching service.
 * @see {@link ActivatedRoute} for route parameter retrieval.
 *
 * @returns {void}
 */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.postsService
        .getPost(id)
        .pipe(
          takeUntil(this.destroy$),
          catchError(() => { 
            this.loading = false;
            return of(undefined);
          })
        )
        .subscribe((post) => {
          this.post = post;
          this.loading = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
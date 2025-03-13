import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { PostComponent } from '../post/post.component';
import { LoaderComponent } from '../loader/loader.component';
import { Subscription, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Component({
  selector: 'app-post-list',
  imports: [PostComponent, LoaderComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  standalone: true,
  providers: [PostsService],
})
export class PostListComponent implements OnInit, OnDestroy {
  private postService = inject(PostsService);

  loading = signal(true);
  posts = signal([] as IPost[]);

  private postsSubscription: Subscription | undefined;

/**
 * Initializes the component and fetches the list of posts.
 * Sets up a subscription to the `getPosts()` observable, updates the `loading` and `posts` signals,
 * and handles potential errors during data fetching.
 *
 * @see {@link ngOnDestroy} for subscription cleanup.
 * @see {@link PostsService.getPosts} for the data fetching service.
 *
 * @returns {void}
 */
  ngOnInit(): void {
    this.postsSubscription = this.postService.getPosts().pipe(
      tap(() => this.loading.set(false)),
      catchError((error) => {
        console.error('Error fetching posts:', error);
        this.loading.set(false);
        return of([]);
      })
    ).subscribe((posts) => {
      this.posts.set(posts);
    });
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }
}
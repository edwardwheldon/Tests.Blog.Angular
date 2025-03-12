import { Component, inject, signal, effect, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts/posts.service';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { PostComponent } from '../post/post.component';
import { LoaderComponent } from '../loader/loader.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  imports: [PostComponent, RouterModule, LoaderComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
  standalone: true,
})
export class PostDetailComponent implements OnDestroy {
  private postsService = inject(PostsService);
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  postId = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id'))))
  );

  /**
   * Signal containing the post ID from the route parameters.
   */
  post = signal<IPost | undefined>(undefined);
  loading = signal(true);

  /**
   * Initialize the component and fetch post data.
   */
  constructor() {
    effect(() => {
      const id = this.postId();
      if (id) {
        this.loading.set(true);
        this.postsService
          .getPost(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((post) => {
            this.post.set(post);
            this.loading.set(false);
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

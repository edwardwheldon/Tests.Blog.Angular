import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts/posts.service';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { PostComponent } from '../post/post.component';
import { LoaderComponent } from '../loader/loader.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**
 * Component to display the details of a single post.
 */
@Component({
  selector: 'app-post-detail',
  imports: [PostComponent, RouterModule, LoaderComponent],
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
   * Initialize the component and fetch post data.
   */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.postsService
        .getPost(id)
        .pipe(takeUntil(this.destroy$))
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
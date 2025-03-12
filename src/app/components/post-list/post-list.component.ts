import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { PostComponent } from '../post/post.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-post-list',
  imports: [PostComponent, LoaderComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  standalone: true,
  providers: [PostsService],
})
export class PostListComponent {
  private postService = inject(PostsService);
  loading = signal(true);

  /**
   * Signal containing the list of posts.
   */
  posts = toSignal(this.postService.getPosts(), {
    initialValue: [] as IPost[],
  });

  /**
   * initialize the component and set up the loading effect.
   */
  constructor() {
    effect(() => {
      if (this.posts() && this.posts().length > 0) {
        this.loading.set(false);
      }
    });
  }
}

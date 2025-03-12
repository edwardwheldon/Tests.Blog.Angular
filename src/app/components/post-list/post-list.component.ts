import { Component, inject } from '@angular/core';
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

  posts = toSignal(this.postService.getPosts(), {
    initialValue: [] as IPost[],
  });
}

import { PostsService } from '../../services/posts/posts.service';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  standalone: true,
})

export class PostComponent implements OnInit {
  @Input() post!: IPost;
  likeCount = signal(0);

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.likeCount.set(this.post.likeCount);
  }

  incrementLikeCount(): void {
    this.likeCount.update((value) => value + 1);
    this.updatePostLikes();
  }

  decrementLikeCount(): void {
    this.likeCount.update((value) => value - 1);
    this.updatePostLikes();
  }

  updatePostLikes(): void {
    this.postService
      .updateLikes({ ...this.post, likeCount: this.likeCount() })
      .subscribe();
  }
}
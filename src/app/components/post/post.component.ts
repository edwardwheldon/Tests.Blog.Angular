import { PostsService } from '../../services/posts/posts.service';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { Component, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-post',
  imports: [RouterModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  standalone: true,
})

export class PostComponent implements OnInit, OnDestroy {
  @Input() post!: IPost;
  likeCount = signal(0);
  private destroy$ = new Subject<void>();

  private postService = inject(PostsService);

  ngOnInit(): void {
    this.likeCount.set(this.post.likeCount);
  }

  public incrementLikeCount(): void {
    this.likeCount.update((value) => value + 1);
    this.updatePostLikes();
  }

  public decrementLikeCount(): void {
    this.likeCount.update((value) => value - 1);
    this.updatePostLikes();
  }

  public updatePostLikes(): void {
    if(this.post){
      this.postService
        .updateLikes(this.post.id, this.likeCount())
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
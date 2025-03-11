import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-list',
  imports: [PostComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  standalone: true,
  providers: [PostsService]
})
export class PostListComponent implements OnInit {
  posts: IPost[] = [];

  constructor(private postService: PostsService) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}

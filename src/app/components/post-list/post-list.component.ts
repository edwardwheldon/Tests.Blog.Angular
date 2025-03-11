import { Component } from '@angular/core';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-post-list',
  imports: [],
  providers: [PostsService],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  standalone: true
})

export class PostListComponent {
  posts: IPost[] = [];

  constructor(private postService: PostsService) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      console.log(posts);
      this.posts = posts;
    });
  }

}

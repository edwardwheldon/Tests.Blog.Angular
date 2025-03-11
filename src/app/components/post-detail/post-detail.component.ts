import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts/posts.service';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { PostComponent } from '../post/post.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  imports: [PostComponent, RouterModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  post: IPost | undefined;

  private postsService = inject(PostsService);
  private route = inject(ActivatedRoute);


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.postsService.getPost(id).subscribe((post) => {
        this.post = post;
      });
    }
  }
}

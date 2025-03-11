import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private readonly _http: HttpClient = inject(HttpClient);

  public getPosts(): Observable<Array<IPost>> {
    return this._http.get<Array<IPost>>('http://localhost:3000/posts');
  }

  public updateLikes(post: IPost): Observable<IPost> {
    return this._http.patch<IPost>(`http://localhost:3000/posts/${post.id}`, {
      likeCount: post.likeCount,
    });
  }

}

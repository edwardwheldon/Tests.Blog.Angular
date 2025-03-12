import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private readonly _http: HttpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/posts';

  public getPosts(): Observable<Array<IPost>> {
    return this._http.get<Array<IPost>>(this.apiUrl);
  }

  public updateLikes(postId: string, likeCount: number): Observable<IPost> {
    return this._http.patch<IPost>(`${this.apiUrl}/${postId}`, {
      likeCount: likeCount,
    });
  }

  public getPost(id: number): Observable<IPost> {
    return this._http.get<IPost>(`${this.apiUrl}/${id}`);
  }
}

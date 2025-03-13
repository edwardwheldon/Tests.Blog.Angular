import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { PostsService } from '../../services/posts/posts.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { of } from 'rxjs';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let activatedRouteSpy = {
    snapshot: { paramMap: new Map([['id', '1']]) },
  };
  const mockPost: IPost = {
    id: '1',
    title: 'Test',
    content: 'content',
    likeCount: 1,
  };

  beforeEach(async () => {
    postsServiceSpy = jasmine.createSpyObj('PostsService', ['updateLikes']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['patch']);

    await TestBed.configureTestingModule({
      imports: [PostComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    TestBed.overrideProvider(PostsService, { useValue: postsServiceSpy });

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    postsServiceSpy.updateLikes.and.returnValue(of(mockPost));
    component.post = mockPost;
    component.likeCount.set(3);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct values', () => {
    expect(component.post).toEqual({
      id: '1',
      title: 'Test',
      content: 'content',
      likeCount: 1,
    });
    expect(component.likeCount()).toBe(1);
  });

  it('should increment likeCount by 1 on incrementLikeCount', () => {
    component.likeCount.set(51);
    expect(component.likeCount()).toBe(51);
    component.incrementLikeCount();
    expect(component.likeCount()).toBe(52);
    expect(postsServiceSpy.updateLikes).toHaveBeenCalledWith('1', 52);
  });

  it('should decrease likeCount by 1 on decrementLikeCount', () => {
    component.likeCount.set(51);
    expect(component.likeCount()).toBe(51);
    component.decrementLikeCount();
    expect(component.likeCount()).toBe(50);
    expect(postsServiceSpy.updateLikes).toHaveBeenCalledWith('1', 50);
  });
});

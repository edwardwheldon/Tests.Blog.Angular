import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { PostsService } from '../../services/posts/posts.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { ActivatedRoute } from '@angular/router';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let activatedRouteSpy = {
    snapshot: { paramMap: new Map([['id', '1']]) },
  };

  const mockPosts: IPost[] = [
    {
      id: '1',
      title: 'Test',
      content: 'content',
      likeCount: 10,
    },
    {
      id: '2',
      title: 'Test',
      content: 'content',
      likeCount: 5,
    },
  ];

  beforeEach(async () => {
    postsServiceSpy = jasmine.createSpyObj('PostsService', ['getPosts']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      imports: [PostListComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    TestBed.overrideProvider(PostsService, { useValue: postsServiceSpy });
  });

  it('should create', () => {
    postsServiceSpy.getPosts.and.returnValue(of(mockPosts));
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should populate the posts signal with data from the service', () => {
    postsServiceSpy.getPosts.and.returnValue(of(mockPosts));
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.posts()).toEqual(mockPosts);
  });

  it('should display "No posts available" when posts are empty', () => {
    postsServiceSpy.getPosts.and.returnValue(of([]));
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const noPostsMessage = fixture.nativeElement.querySelector('p');
    expect(noPostsMessage.textContent).toContain('No posts available');
  });
});
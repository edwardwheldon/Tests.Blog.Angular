import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { PostsService } from '../../services/posts/posts.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let activatedRouteSpy = {
    snapshot: { paramMap: new Map([['id', '1']]) },
  };

  beforeEach(async () => {
    postsServiceSpy = jasmine.createSpyObj('PostsService', ['updateLikes']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['patch']);

    await TestBed.configureTestingModule({
      imports: [PostComponent],
      providers: [
        { provide: PostsService, useValue: postsServiceSpy },
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = {
      id: '1',
      title: 'Test',
      content: 'content',
      likeCount: 0,
    };
    component.likeCount.set(3);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

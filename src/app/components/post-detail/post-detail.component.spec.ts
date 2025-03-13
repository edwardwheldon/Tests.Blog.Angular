import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { PostsService } from '../../services/posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { HttpClient } from '@angular/common/http';


describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  let activatedRouteSpy = {
    snapshot: { paramMap: new Map([['id', '1']]) },
  };

  const mockPost: IPost = {
    id: '1',
    title: 'Test Post',
    content: 'Test Content',
    likeCount: 0,
  };

  beforeEach(async () => {
    postsServiceSpy = jasmine.createSpyObj('PostsService', ['getPost']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      imports: [PostDetailComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: PostsService, useValue: postsServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    TestBed.overrideProvider(PostsService, { useValue: postsServiceSpy });

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loading to true', () => {
    expect(component.loading).toBe(true);
  });

  it('should call getPost with the correct ID', () => {
    postsServiceSpy.getPost.and.returnValue(of(mockPost));
    fixture.detectChanges();
    expect(postsServiceSpy.getPost).toHaveBeenCalledWith(1);
  });

  it('should set post data and loading to false when post is fetched', () => {
    postsServiceSpy.getPost.and.returnValue(of(mockPost));
    fixture.detectChanges();
    expect(component.post).toEqual(mockPost);
    expect(component.loading).toBe(false);
  });

  it('should complete destroy$ subject on ngOnDestroy', () => {
    const destroySpy = spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });

  it('should handle error from getPost', () => {
    postsServiceSpy.getPost.and.returnValue(throwError('Error'));
    fixture.detectChanges();
    expect(component.loading).toBe(false);
    expect(component.post).toBeUndefined();
  });
});

import { TestBed } from '@angular/core/testing';

import { EditorArticleService } from './editor-article.service';

describe('EditorArticleService', () => {
  let service: EditorArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

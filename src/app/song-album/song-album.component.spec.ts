import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongAlbumComponent } from './song-album.component';

describe('SongAlbumComponent', () => {
  let component: SongAlbumComponent;
  let fixture: ComponentFixture<SongAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongAlbumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

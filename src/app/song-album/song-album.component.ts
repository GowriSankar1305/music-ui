import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { SongAlbum } from '../types/SongAlbum';
import { MusicApiService } from '../services/music-api.service';
import { Song } from '../types/Song';
import { UserPlayList } from '../types/UserPlayList';

@Component({
  selector: 'app-song-album',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './song-album.component.html',
  styleUrl: './song-album.component.css'
})
export class SongAlbumComponent implements OnInit {
  album: SongAlbum = new SongAlbum();
  songs: Song[] = [];
  constructor(private apiService: MusicApiService,private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.fetchAlbumSongs(params['uniqueId']);
      this.loadImage(params['imageId']);
      this.album.album = params['albumName'];
      this.album.genre = params['genre'];
      this.album.year = params['year'];
    });
  }

  fetchAlbumSongs(albumId: string) {
    const payload = {'albumId': albumId};
    this.apiService.callSongsOfAlbumApi(payload).subscribe({
      next: resp => {
         this.songs = resp.songs;
      },
      error: resp => {
        console.log(resp);
      }
    });
  }

  loadImage(imageId: string) : void  {
    this.apiService.callImageDownloadApi(imageId).subscribe(response => {
      const reader = new FileReader();
      reader.readAsDataURL(response);
      reader.onloadend = () => {
        this.album.imageContent = reader.result;
      }
    })
  };

  openPopup(songId: string) : void  {
    let lists :UserPlayList[] = []; 
    this.apiService.callFindUserPlayListsApi().subscribe({
      next: resp => {
        lists = resp.playlists;
      }
    });
  }

}

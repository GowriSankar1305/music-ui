import { Component, OnInit } from '@angular/core';
import { MusicApiService } from '../services/music-api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Song } from '../types/Song';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist-songs',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './playlist-songs.component.html',
  styleUrl: './playlist-songs.component.css'
})
export class PlaylistSongsComponent implements OnInit {
  
  constructor(private apiService: MusicApiService,private route: ActivatedRoute) {}
  songs: Song[] = [];
  ngOnInit(): void {
   this.route.queryParams.subscribe(params => {
    this.fetchPlayListSongs(params['playlistId']); 
   }); 
  }

  fetchPlayListSongs(id: string) : void {
    this.apiService.callfetchPlaylistSongsApi({'playlistId':id}).subscribe({
      next: resp => {
         this.songs = resp.songs;
      },
      error: resp => {
        console.log(resp);
      }
    });
  }

}

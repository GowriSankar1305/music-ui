import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MusicApiService } from '../services/music-api.service';
import { SongAlbum } from '../types/SongAlbum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  albums: SongAlbum[] = [];
  ngOnInit(): void {
    this.fetchUserMusicAlbums();
  }
  constructor(private apiService: MusicApiService) {}

  fetchUserMusicAlbums() : void {
    this.apiService.callUserAlbumsApi().subscribe({
      next: async albumArray => {
        for(let item of albumArray.albums) {
          item.imageContent = await this.loadImage(item.albumImageId);
        }
        this.albums = albumArray.albums;
      },
      error: resp =>{
        console.log(resp);
      }
    });
  }

  loadImage(imageId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.apiService.callImageDownloadApi(imageId).subscribe(response => {
        const reader = new FileReader();
        reader.readAsDataURL(response); // convert to base64 string
        reader.onloadend = () => {
          resolve(reader.result as string); // when ready, resolve with the base64 string
        };
        reader.onerror = () => {
          reject('Error loading image');
        };
      });
    });
  }

}

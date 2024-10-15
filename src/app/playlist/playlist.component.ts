import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MusicApiService } from '../services/music-api.service';
import { UserPlayList } from '../types/UserPlayList';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit {
  ngOnInit(): void {
    this.fetchUserPlayLists();
  }
  playlistName: string = '';
  btnContent: string = 'Create new playlist';
  isBtnDisabled: boolean = false;
  playListArray: UserPlayList[] = [];
  constructor(private apiService: MusicApiService)  {}
  
  fetchUserPlayLists() : void {
    this.apiService.callFindUserPlayListsApi().subscribe({
      next: resp => {
        this.playListArray = resp.playlists;
      }
    });
  }

  createPlaylist() : void {
    const payload = {'playlistName': this.playlistName};
    this.apiService.callAddPlayListApi(payload).subscribe({
      next: resp => {
        Swal.fire('Success',resp.message,'success');
        this.fetchUserPlayLists();
      },
      error: resp => {
        console.log(resp);
        let content = resp.error.message;
        if(resp.error.errors) {
          resp.error.errors.forEach((element: any,index: number )=> {
            content += element.msg + '<br>';
          });
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: content,
          confirmButtonText: 'OK'
        });
        this.btnContent = 'Create new playlist';
        this.isBtnDisabled = false;
      }
    });
  }
}

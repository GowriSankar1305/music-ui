import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/ApiResponse';
import { User } from '../types/User';
import { SongAlbum } from '../types/SongAlbum';

@Injectable({
  providedIn: 'root'
})
export class MusicApiService {

  constructor(private httpClient: HttpClient) { }

  hostUrl: string = 'http://localhost:9009/music/';

  callLoginApi(payload: User) : Observable<ApiResponse>  {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'login',payload);
  }

  callRegisterApi(payload: User) : Observable<ApiResponse>  {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'register',payload);
  }

  callSongUploadApi(payload: any) : Observable<ApiResponse>  {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'upload',payload);
  }

  callUserAlbumsApi() : Observable<any> {
    return this.httpClient.post<any>(this.hostUrl + 'user/albums',null);    
  }

  callImageDownloadApi(imageId: string) :Observable<any>  {
    return this.httpClient.get(this.hostUrl + `image/download/${imageId}`,{responseType: 'blob'});
  }
  
  callImageDownloadWithSongIdApi(songId: string) : Observable<any>  {
    return this.httpClient.get(this.hostUrl + `song/image/download/${songId}`,{responseType: 'blob'});
  }
  
  callSongsOfAlbumApi(payload: any) : Observable<any>  {
    return this.httpClient.post(this.hostUrl + 'album/songs',payload);
  }

  callSongDownloadApi(songId: string) : Observable<any> {
    return this.httpClient.get(this.hostUrl + `song/download/${songId}`,{responseType: 'blob'});
  }

  callFindUserPlayListsApi() : Observable<any>  {
    return this.httpClient.post(this.hostUrl + 'user/playlists',null);
  }

  callAddPlayListApi(payload: any) : Observable<ApiResponse>  {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'playlists/add',payload);
  }

  callfetchPlaylistSongsApi(payload: any) : Observable<any> {
    return this.httpClient.post(this.hostUrl + 'user/playlist/songs',payload);
  }

}

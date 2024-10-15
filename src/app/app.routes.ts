import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SongPlayerComponent } from './song-player/song-player.component';
import { SongAlbumComponent } from './song-album/song-album.component';
import { PlaylistSongsComponent } from './playlist-songs/playlist-songs.component';

export const routes: Routes = [
    {path: '',redirectTo: 'login',pathMatch:'full'},
    {path: 'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'upload',component:UploadComponent},
    {path: 'playlists',component:PlaylistComponent},
    {path:'play',component:SongPlayerComponent},
    {path: 'album',component: SongAlbumComponent},
    {path: 'playlist/songs',component: PlaylistSongsComponent}
];

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { MusicApiService } from '../services/music-api.service';

@Component({
  selector: 'app-song-player',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './song-player.component.html',
  styleUrl: './song-player.component.css'
})
export class SongPlayerComponent implements OnInit {
  @ViewChild('audioPlayer', { static: true }) audioPlayer!: ElementRef<HTMLAudioElement>;

  trackTitle: string = 'Track Title';
  artistName: string = 'Artist Name';
  isPlaying: boolean = false;
  progress: number = 0;
  currentTimeDisplay: string = '0:00';
  durationDisplay: string = '0:00';
  volume: number = 0.5;
  audioSrc: any = null;
  imgContent: any;

  constructor(private apiService: MusicApiService,private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.audioPlayer.nativeElement.volume = this.volume;
    this.route.queryParams.subscribe(params => {
      this.loadSong(params['songId']);
      this.loadImage(params['songImgId']); 
    });
  }

  loadSong(id: string)  {
    this.apiService.callSongDownloadApi(id).subscribe(blob => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.audioSrc = reader.result;
        this.audioPlayer.nativeElement.load();
      }
    });
  }

  togglePlayPause() {
    const audio = this.audioPlayer.nativeElement;
    if (audio.paused) {
      audio.play();
      this.isPlaying = true;
    } else {
      audio.pause();
      this.isPlaying = false;
    }
  }

  updateProgress() {
    const audio = this.audioPlayer.nativeElement;
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    this.progress = progressPercent;

    // Update current time and duration display
    this.currentTimeDisplay = this.formatTime(audio.currentTime);
    this.durationDisplay = this.formatTime(audio.duration);
  }

  loadMetadata() {
    const audio = this.audioPlayer.nativeElement;
    this.durationDisplay = this.formatTime(audio.duration);
  }

  seek(event: MouseEvent) {
    const progressElement = (event.target as HTMLElement).closest('.progress');
    const progressWidth = progressElement!.clientWidth;
    const clickX = (event as MouseEvent).offsetX;
    const duration = this.audioPlayer.nativeElement.duration;

    this.audioPlayer.nativeElement.currentTime = (clickX / progressWidth) * duration;
  }

  setVolume() {
    this.audioPlayer.nativeElement.volume = this.volume;
  }

  prevTrack() {
    // Logic for previous track
  }

  nextTrack() {
    // Logic for next track
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${sec}`;
  }

  loadImage(songId: string) : void  {
    this.apiService.callImageDownloadWithSongIdApi(songId).subscribe(response => {
      const reader = new FileReader();
      reader.readAsDataURL(response);
      reader.onloadend = () => {
        this.imgContent = reader.result;
      }
    })
  };

}

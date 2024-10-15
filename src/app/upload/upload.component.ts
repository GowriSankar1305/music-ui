import { Component } from '@angular/core';
import { Constants } from '../types/Constants';
import { MusicApiService } from '../services/music-api.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  selectedFile: File | null = null;
  btnContent: string = 'Upload song';
  isBtnDisabled: boolean = false;
  constructor(private apiService: MusicApiService) {}
  uploadSong() : void {
    if (!this.selectedFile) {
      alert('Please select a file to upload.');
      return;
    }
    this.btnContent = Constants.BTN_CONTENT;
    this.isBtnDisabled = true;
    const formData = new FormData();
    formData.append('song', this.selectedFile);
    this.apiService.callSongUploadApi(formData).subscribe({
      next: resp => {
        this.selectedFile = null;
        Swal.fire('Success',resp.message,'success');
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
        this.btnContent = 'Upload song';
        this.isBtnDisabled = false;
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

}

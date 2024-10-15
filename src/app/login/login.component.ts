import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../types/User';
import { FormsModule } from '@angular/forms';
import { MusicApiService } from '../services/music-api.service';
import Swal from 'sweetalert2';
import { Constants } from '../types/Constants';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private apiService: MusicApiService,
    private storageService: SessionStorageService,
    private router: Router) {

  }
  btnContent: string = 'Login';
  isBtnDisabled: boolean = false;
  user: User = new User();
  
  loginTheUser() : void {
    this.btnContent = Constants.BTN_CONTENT;
    this.isBtnDisabled = true;
    this.apiService.callLoginApi(this.user).subscribe({
      next: resp => {
        this.storageService.addItem(Constants.TOKEN,resp.token);
        this.btnContent = 'Login';
        this.isBtnDisabled = false;
        this.router.navigate(['/dashboard']);
      },
      error: resp => {
        Swal.fire(resp.error.errors);
        this.btnContent = 'Login';
        this.isBtnDisabled = false;
      }
    });
  }

}

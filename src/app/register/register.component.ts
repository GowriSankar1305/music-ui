import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../types/User';
import { MusicApiService } from '../services/music-api.service';
import { Constants } from '../types/Constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = new User();
  btnContent: string = 'Login';
  isBtnDisabled: boolean = false;
  constructor(
    private apiService: MusicApiService,
    private router: Router) {

  }

  registerUser() : void {
    this.btnContent = Constants.BTN_CONTENT;
    this.isBtnDisabled = true;
    this.apiService.callRegisterApi(this.user).subscribe({
      next: resp => {
        Swal.fire('Success',resp.message,'success');
        this.router.navigate(['/login']);
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
        this.btnContent = 'Register';
        this.isBtnDisabled = false;
      }
    });
  }

}

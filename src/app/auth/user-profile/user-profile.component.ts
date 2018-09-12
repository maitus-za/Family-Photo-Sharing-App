import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  profileForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder) {
    this.profileForm  = fb.group( {
      username: ['',[Validators.required, Validators.minLength(5)]],
      firstName: '',
      middleName: '',
      lastName: ''
    });
  }

  ngOnInit() {
  }

  save() { }
  
  /* For Error? */
  formError(fc: string, errCode: string, preRequired?: string[]): boolean {
    if(preRequired && preRequired.length > 0) {
      for (let i = 0; i < preRequired.length; ++i) {
        if (this.profileForm.get(fc).hasError(preRequired[i])) { /* if has error in position */
          return false;
        }
      }
    }
    return this.profileForm.get(fc).hasError(errCode);
  }
}

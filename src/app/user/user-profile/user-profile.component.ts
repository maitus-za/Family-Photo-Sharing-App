import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../user/shared/user.service';
import { User } from '../../user/shared/models/user';
import { Subscription } from 'rxjs';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import { FileService } from '../../file-system/file.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [trigger('imageHovering', [
    state('hoveringImage', style ({
      opacity: 0.3
    })),
    state('notHoveringImage', style ({
      opacity: 1
    })),
    transition('hoveringImage <=> notHoveringImage', animate('200ms ease-in'))
  ])]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  user: User;
  userSubscribe: Subscription;
  isHovering: boolean;
  img: string;

  constructor(private userService: UserService,
              private fileService: FileService,
              private fb: FormBuilder,
              private snack: MatSnackBar) {
    this.profileForm  = fb.group( {
      username: ['',[Validators.required, Validators.minLength(5)]],
      firstName: '',
      middleName: '',
      lastName: '' 
    });
  }

  /* Save subscription after listening on userSubscription */
  ngOnInit() { 
    this.userSubscribe = this.userService.getUser() /* get the authenticated user */
      .subscribe( user => {
        this.user = user; /* paste the user on the local user */
        this.profileForm.patchValue(user); /* After getting the user we wanna populate the information in the profile form */
        console.log(user)
      });
  }

  /* It's crutial to have unsubscribe in you app so that you cannot have huge data */
  /* When I am done listening i wanna stop listening until i go back to that component  */
  ngOnDestroy(){
    this.userSubscribe.unsubscribe();
  }

  hovering(isHovering: boolean) {
    this.isHovering = isHovering; 
  }

  changePicture(event) {
    if (event.toState === 'hoveringImage') {
      this.img = '../../../../assets/sharp-cloud_upload-24px.svg'; //The image added in to the project
    } else {
      this.img = 'https://firebasestorage.googleapis.com/v0/b/photosharingapp-348ad.appspot.com/o/download.png?alt=media&token=9aa6a4e2-32b7-4ea8-bb3b-37808f88b43b';
    } 
    console.log('animation done, ', event);
  }
 
  //Accept drops
  //Allowing only jpeg & png pictures
  UploadNewImage(fileList) {
    if (fileList && fileList.length === 1 && 
       ['image/jpeg', 'image/png'].indexOf(fileList.item(0).type) > -1) { /*Allowing 2 types of files to be uploaded*/
      const file = fileList.item(0);
      const path = 'profile-images/' + this.user.uid;
      this.fileService.upload(path, file).downloadUrl.subscribe(
        url => {
          this.img = url;
        }
      );
    } else {
      this.snack.open('You need to drop a single png or jpeg image', null, {
        duration: 4000
      });
    }
  }

  //Updating user profile
  save() { 
    const model = this.profileForm.value as User; /* Getting the user info from the form */
    model.uid = this.user.uid;  /* get the unique identifier from the actual user we have locally */
    this.userService.update(model)
      .then( () => console.log('saved')) /* => error notation */
      .catch( err => console.log('error', err));
  }
  
  unchanged(): boolean {  
    const model = this.profileForm.value as User;  
    return model.username === this.user.username &&
        model.firstName === this.user.firstName &&
        model.middleName === this.user.middleName &&
        model.lastName === this.user.lastName;
  }

  /* For Error */
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
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserProfileService } from '../../service/user-profile.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  submitted: boolean = false;
  loading: boolean = false;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private _profileService: UserProfileService,
    private _router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) return;

    this.loading = true; // start spinner loading only if for is valid

    this.user = this.userForm.value;
    console.log('User Obj: ', this.user);

    this._profileService.createUser(this.user).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Create User: ', response);
        this._router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Create User Error: ', err);
        // this.error = err.originalError.error;
        this.error = 'Error occurred while creating user!';
        this.loading = false;
        return;
      },
      complete: () => console.log('User creation completed'),
    });
  }
}

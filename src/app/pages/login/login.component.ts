import { Component, inject } from '@angular/core';
import { FormsModule, Validator, ReactiveFormsModule, FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error: boolean = false;
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  //formulario
  form = this.fb.nonNullable.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ],
    ],
    password: [
      '',
      Validators.required
    ],
  });
  //metodo para enviar el formulario
  onSubmit(){
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email,rawForm.password)
      .subscribe({
        next: () =>{
          this.router.navigateByUrl('/home');
        },
        error: (error) => {
          this.error = true;
          console.error('Error ',error);
        }
      })
  }
}

// access.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { PasswordUpdateRequest } from 'src/app/password-update-request';

@Component({
    selector: 'app-access',
    templateUrl: './access.component.html',
})
export class AccessComponent { 
    passwordUpdateRequest: PasswordUpdateRequest;
   
    constructor(private authService: AuthService, private router: Router) {
        this.passwordUpdateRequest = new PasswordUpdateRequest('', '', '', '');
    }

    changePassword() {
        this.authService.updatePassword(this.passwordUpdateRequest).subscribe(
            response => {
                console.log('Password updated successfully:', response);
               
            },
            error => {
                console.error('Error updating password:', error);
                // Gérer les erreurs de mise à jour du mot de passe ici
                this.router.navigate([""]);
            }
        );
    }
}

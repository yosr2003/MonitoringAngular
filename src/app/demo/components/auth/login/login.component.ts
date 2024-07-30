import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { TokenStorageService } from 'src/app/token-storage-service.service';
import { loginResponse } from './loginResponse';
import { Utilisateur } from 'src/app/utilisateur';
import { Roles } from 'src/app/roles';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

  

    loginForm: FormGroup;
    auth: Utilisateur = {
        idUser: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roles: undefined,
        getIdUser: function (): number {
            throw new Error('Function not implemented.');
        },
        setIdUser: function (idUser: number): void {
            throw new Error('Function not implemented.');
        },
        getFirstName: function (): string {
            throw new Error('Function not implemented.');
        },
        setFirstName: function (firstName: string): void {
            throw new Error('Function not implemented.');
        },
        getLastName: function (): string {
            throw new Error('Function not implemented.');
        },
        setLastName: function (lastName: string): void {
            throw new Error('Function not implemented.');
        },
        getEmail: function (): string {
            throw new Error('Function not implemented.');
        },
        setEmail: function (email: string): void {
            throw new Error('Function not implemented.');
        },
        getPassword: function (): string {
            throw new Error('Function not implemented.');
        },
        setPassword: function (password: string): void {
            throw new Error('Function not implemented.');
        },
        getRoles: function (): Set<Roles> {
            throw new Error('Function not implemented.');
        },
        setRoles: function (roles: Set<Roles>): void {
            throw new Error('Function not implemented.');
        }
    };
    boo:boolean;
    accessToken: any = {};
    msg:string="false information";
  
    constructor( private authservice: AuthService, private tokenStorage:TokenStorageService,private route:Router) {}
    // passwordptn = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$';
  
    ngOnInit(): void {
  
    }
  
    login() {
  
      let p:any;
      this.authservice.login(this.auth).subscribe((data : loginResponse) => {
         p=data
      
       console.log('the result after login is', data.accessToken);
    
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        
      //  this.toast.success({detail:"Identification faite avec succée",summary:"Vous étes authentifié(e)",duration:5000})
        // this.loginForm.reset();
        if (data.firstLogin) {
            // Redirect to change password page
            this.route.navigate(['/auth/access']);
          } else {
            // Redirect to dashboard or home page
            this.route.navigate([""]);
          }
        
      },(err)=>{
     //   this.toast.error({detail:"Message d'Erreur",summary:"Identification échouée,Ressayer!",duration:5000})
     console.log(err);
     
         }
      )
      } 

    
  
}

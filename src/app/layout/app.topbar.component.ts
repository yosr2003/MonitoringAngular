import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';  // Utilisez Router au lieu de Route

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    notificationCount: number = 5; 
    iconsMenuVisible: boolean = false;
    constructor(public layoutService: LayoutService, private authservice: AuthService, private router: Router) { 
        
    }

    logout() {
        this.authservice.logout();
        this.router.navigate(['/auth/login']);
    }
 

    showNotifications() {
        // Implement your logic to show notifications
        console.log('Notifications clicked');
      }
      toggleIconsMenu() {
        this.iconsMenuVisible = !this.iconsMenuVisible;
      }
}

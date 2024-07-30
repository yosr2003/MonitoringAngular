import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { AccessRoutingModule } from './access-routing.module';
import { AccessComponent } from './access.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        AccessRoutingModule,
        ButtonModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        CheckboxModule,
        ButtonModule,
        RippleModule,
        CommonModule
    ],
    declarations: [AccessComponent]
})
export class AccessModule { }

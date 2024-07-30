import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessComponent } from './access.component';
import { FirstLoginGuard } from 'src/app/first-login.guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AccessComponent }
    ])],
    exports: [RouterModule]
})
export class AccessRoutingModule { }

import { ReactiveFormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthService } from "./auth.service";
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MatSnackBarModule,
    ],
    providers: [AuthService]
})
export class AuthModule{}
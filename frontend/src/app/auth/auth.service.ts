import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthResData, loginModel, signupModel, User } from "./auth.model";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})

export class AuthService {
    user = new BehaviorSubject<User>(null!);
    constructor(private http: HttpClient, private router: Router) {  }

    signup(account: signupModel) {
        return this.http.post<AuthResData>('http://127.0.0.1:7000/api/accounts/signup/', account)
        .pipe(catchError(this.handleError), tap((res)=>{
            console.log(res)
        }))
    }

    login(account: loginModel) {
        return this.http.post<AuthResData>('http://127.0.0.1:7000/api/accounts/login/', account)
        .pipe(catchError(this.handleError), tap((res)=>{
            this.handleAuth(res);
        }))
    }

    autoLogin(){
        const userData: AuthResData = JSON.parse(localStorage.getItem('user')!)
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.user_id!, userData.email, userData.username, userData.name!, userData.token!)
        this.user.next(loadedUser)
        return;
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error)
        let errormessage = 'An unknown error occured'
        if(!error.error){
            return throwError(errormessage)
        }
        if(error.error.email){
            errormessage = error.error.email[0]
        }
        if(error.error.username){
            errormessage = error.error.username[0]
        }
        return throwError(errormessage)
    }

    private handleAuth(res: AuthResData) {
        const user = new User(res.user_id!, res.email, res.username, res.name!, res.token!);
        this.user.next(user);
        localStorage.setItem('user', JSON.stringify(user))
    }
    logout(){
        this.user.next(null!)
        localStorage.removeItem('user');
        this.router.navigate(['/auth'])
    }
}
import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Client } from "../models/client.model";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";

@Injectable()
export class LogicService {
    private url = 'http://localhost:62750/api/';
    private headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Access-Control-Allow-Headers', '*');
        this.headers.append('Access-Control-Allow-Methods', '*');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    getClients(): Observable<Client[]> {
        return this.http.get(this.url + "client/", { headers: this.headers })
            .pipe(map(response => response.json()))
    }

    login(user: User): Observable<User> {
        return this.http.post(this.url + "user/login/", user, { headers: this.headers })
            .pipe(map(response => response.json()))
    }

    setLogIn(user: User): void {
        window.localStorage.setItem('login', JSON.stringify(user));
    }

    isLoggedIn(): boolean {
        return window.localStorage.getItem('login')? true: false;
    }

    getLoggedInUser(): string{
        return JSON.parse(window.localStorage.getItem('login'));
    }

    logout(): void {
        window.localStorage.removeItem("login");
    }
}
import { Injectable } from '@angular/core';
import { Auth, user, User, browserLocalPersistence, signInWithEmailAndPassword,signOut, browserSessionPersistence  } from '@angular/fire/auth';
import { setPersistence } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>;
  constructor(private firebaseAuth:Auth) {
    this.user$ = user(this.firebaseAuth);
    this.setSessionStoragePersistence();
   }
   private setSessionStoragePersistence():void{
    setPersistence(this.firebaseAuth, browserSessionPersistence);
   }
   //metodo de loginnnnnn
   login(email: string, password: string): Observable<void>{
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, email, password
    ).then(() =>{

    });

    return from(promise);
   }
   //metodo del logout
   logout():Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() =>{
      sessionStorage.clear();
    });
    return from(promise);
   }
}

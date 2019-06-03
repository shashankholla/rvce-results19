import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebase: AngularFireDatabase) { }

  getUsn(){
    return this.firebase.list('rvce-results').valueChanges();
  }
}

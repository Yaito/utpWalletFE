import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Subscription } from 'rxjs';
import { ARD } from 'src/assets/models';

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {

  apiURL = 'http://127.0.0.1:5000';

  constructor(private httpService: HttpClient) { }

  read():Observable<ARD> {
    // read the user id in the nfc card from a local API code
    return this.httpService.get<ARD>(`${this.apiURL}/read`);
  }

  write(
    user_ID: number,
    ) {
    // send the user id to be registered in a NFC card to a local API code
    return this.httpService.put<any>(`${this.apiURL}/write`,
    { user_ID });
  }

}

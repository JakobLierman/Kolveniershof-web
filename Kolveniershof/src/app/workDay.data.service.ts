import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { map, share, catchError, delay } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Workday } from "./domain/workday.model";

@Injectable({
  providedIn: "root"
})
export class WorkDayDataService {
  public loadingError$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  get workdays$(): Observable<Workday[]> {
    return this.http.get(`${environment.apiUrl}/API/Workdays`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }),
      map((list: any[]): Workday[] => list.map(Workday.fromJSON))
    );
  }
}
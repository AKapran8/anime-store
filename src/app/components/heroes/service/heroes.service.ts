import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IAddEditHero,
  IAddEditHeroResponse,
  IGetHeroesNameResponse,
  IGetHeroesResponse,
} from '../model.hero';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private _http: HttpClient) {}

  public getHeroes(): Observable<IGetHeroesResponse> {
    return this._http.get<IGetHeroesResponse>(
      'http://localhost:3000/api/heroes'
    );
  }

  public getHeroesList(): Observable<IGetHeroesNameResponse> {
    return this._http.get<IGetHeroesNameResponse>(
      'http://localhost:3000/api/heroes/names'
    );
  }

  public addHero(body: IAddEditHero): Observable<IAddEditHeroResponse> {
    const nameWithoutSpaces: string = body.name.replace(/\s+/g, '');
    const imageUrl: string = `${nameWithoutSpaces}_${body.animeId}`;

    const requestBody = new FormData();
    requestBody.append('name', body.name);
    requestBody.append('animeId', body.animeId);
    requestBody.append('imageUrl', body.imageUrl);
    if (body.image) requestBody.append('image', body.image, imageUrl);

    return this._http.post<IAddEditHeroResponse>(
      'http://localhost:3000/api/heroes',
      requestBody
    );
  }

  public deleteHero(
    id: string,
    fileName: string,
    animeId: string
  ): Observable<{ message: string }> {
    return this._http.delete<{ message: string }>(
      `http://localhost:3000/api/heroes/${id}?fileName=${fileName}&animeId=${animeId}`
    );
  }

  public editHero(
    requestBody: IAddEditHero,
    id: string
  ): Observable<IAddEditHeroResponse> {
    return this._http.put<IAddEditHeroResponse>(
      `http://localhost:3000/api/heroes/${id}`,
      requestBody
    );
  }
}
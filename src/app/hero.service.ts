import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  private heroesUrl = 'api/heroes'; // URl to web api

  constructor(public messageService: MessageService, private http : HttpClient) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    //const heroes=of(HEROES);
    const heroes = this.http.get<Hero[]>(this.heroesUrl)
    this.log('fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find((hero) => hero.id === id)!;
    this.log(`fetched hero id=${id}`);
    return of(hero);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG_API_URL } from './constants';
import { SearchRequest } from './contracts';

@Injectable({
    providedIn: 'root'
})
export class MusicdbappService {

    url: String;
    headers: any;

    private readonly LOOK_UP_ARTISTS = 'LOOK_UP_ARTISTS';
    private readonly LOOK_UP_ARTIST_TRACKS = 'LOOK_UP_ARTIST_TRACKS';

    constructor(private http: HttpClient) {
        this.url = APP_CONFIG_API_URL;

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": '*'
        })
    }


    getArtists(searchForm: SearchRequest) {
        return new Promise((resolve, reject) => {
            var json = searchForm;
            var params = json;
            this.http.get(this.url + '/search/artist/?q=' + params + '&index=0&limit=8')
                .subscribe((data) => {
                    localStorage.setItem(this.LOOK_UP_ARTISTS, JSON.stringify(data));
                    resolve(data);
                },
                    error => {
                        console.log("/lookup call service for artist failed");
                        reject(error);
                    })
        })
    }

    getArtist(id: number) {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/artist/' + id + '/top?limit=8')
                .subscribe((data) => {
                    localStorage.setItem(this.LOOK_UP_ARTIST_TRACKS, JSON.stringify(data));
                    resolve(data);
                },
                    error => {
                        console.log("/lookup call service for artist tracks failed");
                        reject(error);
                    })
        })
    }
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MusicdbappService } from '../musicdbapp.service';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['../../style/customStyling.scss']
})
export class ArtistsComponent implements OnInit {
    artistResults: any[];


    constructor(
        private route: ActivatedRoute,
        public musicDbService: MusicdbappService,
        private location: Location) { }

    ngOnInit() {
        this.getArtistTracks();
    }

    getArtistTracks() {
        this.artistResults = [];
        const id = +this.route.snapshot.paramMap.get('id');

        this.musicDbService.getArtist(id)
            .then((data) => {
                this.artistResults.push(data);
            })
            .catch(() => {
                console.log("Lookup artist tracks component failed");
            })

        console.log(this.artistResults);
    }

    goBack() {
        this.location.back();
    }
}

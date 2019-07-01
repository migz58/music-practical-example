import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MusicdbappService } from '../musicdbapp.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['../../style/customStyling.scss']
})
export class HomeComponent implements OnInit {
    @Input() enabled: boolean = true;
    searchForm: FormGroup;
    artistName: FormControl;
    failed: boolean;
    noSearch: boolean;
    artistsResults: any[];

    searchName: String;


    constructor(public musicDbService: MusicdbappService, private router: Router) { }

    ngOnInit() {
        this.createSearchForm();
        this.noSearch = true;
    }

    createSearchForm() {
        this.searchForm = new FormGroup({
            artistName: this.artistName = new FormControl('', [Validators.required])
        })
    }

    onSearch() {
        this.failed = false;
        this.artistsResults = [];

        let searchRequest = this.artistName.value;
        console.log(searchRequest);
        this.searchName = searchRequest;

        this.musicDbService.getArtists(searchRequest)
            .then((data) => {
                this.noSearch = false;
                this.artistsResults.push(data);
            })
            .catch(() => {
                console.log("Lookup component failed");
                this.noSearch = true;
            })

        console.log(this.artistsResults);
    }
}
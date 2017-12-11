import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'home',
    template: `<h3>{{ message }}</h3>
    <br/>
    <div *ngIf="repositoryStarsCount">
        <a href="https://github.com/angular/universal-starter">Angular/universal-starter</a>
        has <b>{{repositoryStarsCount}}</b> stars on GitHub <i>(fetched by HTTP request)</i>
    </div>`
})
export class HomeComponent implements OnInit {
    public message: string;
    public repositoryStarsCount: string;


    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.message = 'Hello';
        this.getUniversalStartersStars();
    }

    /**
     * Return number of angular/universal-starter GitHub stars
     * @returns {Subscription}
     */
    getUniversalStartersStars() {
        const url: string = 'https://api.github.com/repos/angular/universal-starter';
        return this.http.get(url).subscribe(
            (response: any) => {
                // set number of starters into repositoryStarsCount, and thousand separate it:
                this.repositoryStarsCount = response.stargazers_count.toLocaleString();
            },
            (error) => {
                console.warn(error)
            });
    }
}
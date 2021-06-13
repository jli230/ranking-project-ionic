import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RankingAPI } from "./rankingApi_interface";


@Component({
    selector: 'ranking',
    templateUrl: 'ranking.html'
})
export class RankList implements OnInit {
    public theTodo: RankingAPI;
    private _apiURL = 'https://api-v3.accurofitapp.net/challenges/54';
    constructor(
        private http: HttpClient
    ) {}
    ngOnInit(){
        this.http.get(this._apiURL).subscribe((data: RankingAPI) => {
            this.theTodo = data ;
            
            this.theTodo.data.forEach(item => {
                if (item.points == undefined) {
                    item.points = 0;
                }
            })
            
            console.log(this.theTodo.data);
        }) ;
    }
}

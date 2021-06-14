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
            this.theTodo = data;
            var weekbonus = 0;
            this.theTodo.data.forEach(item => {
                if (item.points == undefined) {
                    item.points = 0;
                }
                else {
                    item.detail.forEach(entry => {
                        if (entry.points >3600 ){
                            entry.points = 3600;
                        }
                    })
                    let weekcount = new Date (item.detail[0].workoutDate);
                    var boncount=0;
                    var pointtally = 0;
                    var weektally = 0;
                    item.detail.forEach(entry2 => {
                        if (entry2.points > 600){
                            boncount++;
                        }
                        pointtally+=entry2.points;
                        weektally+=entry2.points*.1;
                        let dayCount= new Date (entry2.workoutDate);
                        if ((weekcount.getTime()-dayCount.getTime())<=0){
                            weekcount = dayCount;
                            if (boncount >= 3) {
                                boncount=0;
                                pointtally+=weektally;
                            }
                            weektally = 0;
                        }
                    })
                    item.points=pointtally;
                }
             })
            
            console.log(this.theTodo.data);
        }) ;
    }
}

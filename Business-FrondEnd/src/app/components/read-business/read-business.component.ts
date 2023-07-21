import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Business } from 'src/app/interface/business';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-read-business',
  templateUrl: './read-business.component.html',
  styleUrls: ['./read-business.component.css']
})
export class ReadBusinessComponent implements OnInit {
  id: Number;
  business$!: Observable<Business>

  constructor (
    private _businessService: BusinessService,
    private aRoute: ActivatedRoute
    ) { 
      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    }

  ngOnInit(): void {
    this.business$ = this._businessService.getBusinessById(this.id)
  }
}

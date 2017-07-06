import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferState } from '../../../modules/transfer-state/transfer-state';

import {API_BASE_URL, MOBILE} from '../../services/constants';
import { Product } from '../../models/product';
import { Http } from '@angular/http';

@Component({
  selector: 'list-page',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  public products: Product[] = [];

  constructor(
    private cache: TransferState,
    public route: ActivatedRoute,
    public router: Router,
    private http: Http
  ) { }

  ngOnInit() {
    /*for ( let i = 0; i < 20; i++ )
      this.products.push( new Product() );*/

    try {
      this.http.get(`${API_BASE_URL}products.json`)
        .subscribe(products => {
          this.products = <Product[]> products.json();
        }, error => {
          console.log(error);
        });
    } catch ( error ) {
      console.log( error );
    }
  }
}

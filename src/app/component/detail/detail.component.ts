import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferState } from '../../../modules/transfer-state/transfer-state';

import { API_BASE_URL, MOBILE } from '../../services/constants';
import { Product } from '../../models/product';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'detail-page',
  styleUrls: ['./detail.component.scss'],
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  public product: Product = new Product();
  public id: string;

  constructor(
    private cache: TransferState,
    public route: ActivatedRoute,
    private http: Http,
    private sanatizer: DomSanitizer
) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if ( params['id'] && params['id'] !== '' ) {
          this.id = params['id'];
          this.getData();
        }
      }
    );
  }

  getData() {
    try {
      this.http.get(
        `${API_BASE_URL}products.json?orderBy="productId"&startAt=${this.id}&limitToFirst=1`
      ).subscribe(product => {
          let op = Object.values(product.json());
          if ( Array.isArray(op) && op.length > 1 ) {
            for ( let i = 0; i < op.length; i++ ) {
              if ( op !== null && Number(op[i].productId) === Number(this.id) ) {
                this.product = <Product> op[i];
                break;
              }
            }
          } else
            this.product = <Product> op[0];
        }, error => {
          console.log(error);
        });
    } catch ( error ) {
      console.log( error );
    }
  }

  public getThumbnail() {
    return this.sanatizer.bypassSecurityTrustResourceUrl(this.product.thumbnailUrl);
  }

  public getDescription() {
    return this.sanatizer.bypassSecurityTrustHtml(this.product.description);
  }

  public getBrand() {
    return Number(this.product.price) < 50 ? 'Polo' : 'Lee Cooper';
  }
}

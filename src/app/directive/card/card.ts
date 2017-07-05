import {Component, Input, OnInit} from '@angular/core';
import { Product } from '../../models/product';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'product-card',
  templateUrl: 'card.html',
  styleUrls: ['card.scss'],
})
export class ProductCard {
  @Input()
  public product: Product;

  constructor( private sanatizer: DomSanitizer ) {
    this.product = new Product();
  }

  public getSizesText() {
    if ( this.product.sizeAvailable && Array.isArray( this.product.sizeAvailable )
      && this.product.sizeAvailable.length > 0 )
      return this.product.sizeAvailable.join(', ').toUpperCase();
    else
      return '';
  }

  public getBrand() {
    return Number(this.product.price) < 50 ? 'Polo' : 'Lee Cooper';
  }

  public getThumbnailBackground() {
    return this.sanatizer.bypassSecurityTrustStyle('url(' + this.product.thumbnailUrl + ')');
  }
}

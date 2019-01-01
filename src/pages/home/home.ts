import { Component,ViewChild } from '@angular/core';
import { NavController,Slides } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce : any;
  products : any[];

  @ViewChild('productSlides') productSlides : Slides;

  constructor(public navCtrl: NavController) {
      this.WooCommerce = WC({
        url: "http://alilougg.com.au",
        consumerKey:"ck_aee4700f43a0e80490d07e3858de1f84111262ee",
        consumerSecret:"cs_170cf9a6ac93b1ed35577e99c57c42efaffc9aa9",
      });

      this.WooCommerce.getAsync("products").then((data)=>{
        console.log(JSON.parse(data.body));
        this.products = JSON.parse(data.body).products;
      },(err)=>{
        console.log(err)
      })

  }

    ionViewDidLoad(){
      setInterval(()=>{
        if(this.productSlides.getActiveIndex()== this.productSlides.length()-1)
          this.productSlides.slideTo(0);

        this.productSlides.slideNext();
      },3000)
    }



}

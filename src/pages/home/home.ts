import { Component,ViewChild } from '@angular/core';
import { NavController,Slides,ToastController } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce : any;
  products : any[];
  moreProducts :any[];
  page:number;

  @ViewChild('productSlides') productSlides : Slides;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController) {

    this.page = 2;

    this.WooCommerce = WC({
      url: "http://alilougg.com.au",
      consumerKey:"ck_aee4700f43a0e80490d07e3858de1f84111262ee",
      consumerSecret:"cs_170cf9a6ac93b1ed35577e99c57c42efaffc9aa9",
    });

      this.loadMoreProducts(null);

      this.WooCommerce.getAsync("products").then((data)=>{
        console.log(JSON.parse(data.body));
        this.products = JSON.parse(data.body).products;
      },(err)=>{
        console.log(err)
      })

  }
    //change slider every 3 seconds
    ionViewDidLoad(){
      setInterval(()=>{
        if(this.productSlides.getActiveIndex()== this.productSlides.length()-1)
          this.productSlides.slideTo(0);

        this.productSlides.slideNext();
      },3000)
    }


    //next 10 product will display
    loadMoreProducts(event){

      if(event == null)
      {
          this.page =2 ;
          this.moreProducts =[];
      }else
          this.page++;

      this.WooCommerce.getAsync("products?page="+this.page).then((data)=>{
        console.log(JSON.parse(data.body));
        this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);


        if(event!=null)
        {
          event.complete();
        }
        if(JSON.parse(data.body).products.length < 10){
          event.enable(false);


          this.toastCtrl.create({
            message: "No more products!",
            duration: 5000
          }).present();

        }

      },(err)=>{
        console.log(err)
      })


    }

}

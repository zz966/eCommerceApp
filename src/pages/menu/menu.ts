import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home'
import * as WC from 'woocommerce-api';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: any;
  WooCommerce: any;
  categories: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage
    this.categories = [];

    this.WooCommerce = WC({
      url: "http://alilougg.com.au",
      consumerKey:"ck_aee4700f43a0e80490d07e3858de1f84111262ee",
      consumerSecret:"cs_170cf9a6ac93b1ed35577e99c57c42efaffc9aa9",
    });

    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      //add icon to category
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].parent == 0) {

          temp[i].subCategories = [];

          if (temp[i].slug == "clothing") {
            temp[i].icon = "shirt";
          }
          if (temp[i].slug == "music") {
            temp[i].icon = "musical-notes";
          }
          if (temp[i].slug == "men") {
            temp[i].icon = "images";
          }

          this.categories.push(temp[i]);
        }
      }

      //Groups Subcategories

      // for (let i = 0; i < temp.length; i++){
      //   for (let j = 0; j < this.categories.length; j++){
      //     //console.log("Checking " + j + " " + i)
      //     if(this.categories[j].id == temp[i].parent){
      //       this.categories[j].subCategories.push(temp[i]);
      //     }
      //   }
      // }



    }, (err) => {
      console.log(err)
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}

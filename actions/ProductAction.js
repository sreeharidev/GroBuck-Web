import GroceryConstants from '../constants/GroceryConstants.js';
import Utils from '../components/Utils.js';
export default class ProductAction {
   
  createProduct(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.PRODUCTS_CREATE);
  }
  createProductPrice(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.PRODUCTS_CREATE);
  }
}
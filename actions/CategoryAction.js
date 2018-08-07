import GroceryConstants from '../constants/GroceryConstants.js';
import Utils from '../components/Utils.js';
export default class CategoryAction {
   
  getProductsByCategory(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.PRODUCTS_BY_CATEGORY+data.categoryId);
  }
   getProductsByShop(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.PRODUCTS_BY_SHOP);
  }
  
}
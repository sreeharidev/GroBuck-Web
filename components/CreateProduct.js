import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import GroceryConstants from '../constants/GroceryConstants'; 
import CommonStore from '../stores/CommonStore'; 
import ProductAction from '../actions/ProductAction';
import Utils from './Utils';
export default class CreateProduct extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.createProductPrice = this.createProductPrice.bind(this);
    this._onProductsChange = this._onProductsChange.bind(this);
    this.state ={message:"",productName: "", productDescription: "", categoryId: "", smallImage: ""};
  }
   handleChange(event) {
    var  val ={};
    val[event.target.id] = event.target.value;
    this.setState(val);
  }
  createProduct(){
    console.log(this.state);
    let pAction = new ProductAction();
    console.log({productName: this.state.productName, productDescription: this.state.productDescription, categoryId: this.state.categoryId, smallImage: this.state.smallImage});
    pAction.createProduct({productName: this.state.productName, productDescription: this.state.productDescription, categoryId: this.state.categoryId, smallImage: this.state.smallImage},"createProduct");

  }
  createProductPrice(){
    console.log(this.state);
    let pAction = new ProductAction();
    
    pAction.createProductPrice({productId: this.state.productId, price: this.state.price, weight: this.state.weight, discount: this.state.discount},"createProductPrice");

  }
  _onProductsChange(data){
    this.setState(data);
  }
  componentDidMount() {
    CommonStore.addChangeListener(GroceryConstants.PRODUCTS_CREATE,this._onProductsChange);
  }
  componentWillUnmount() {
    CommonStore.removeChangeListener(GroceryConstants.PRODUCTS_CREATE,this._onProductsChange);
  }
  render(){
    return <div><div className="row"><br /><b>Admin Screen</b></div>
         <div className="row">
         <div className="col-lg-2">
            &nbsp;
          </div>
          <div className="col-lg-2">
            <b>{this.state.message}</b>
          </div> 
         </div>
        <div className="row">
          <div className="col-lg-2">
            Product Name
          </div>
          <div className="col-lg-2">
            <input type="text" id="productName" name="productName" onChange={this.handleChange}/>
          </div>
          </div>
          <div className="row">
          <div className="col-lg-2">
            Product Description
          </div>
          <div className="col-lg-4">
            <input id="productDescription" name="productDescription" onChange={this.handleChange}/>
          </div>

            </div>
            <div className="row">
          <div className="col-lg-2">
            Category Id
          </div>
          <div className="col-lg-4">
            <input id="categoryId" name="categoryId" onChange={this.handleChange}/>
          </div>

            </div>

            <div className="row">
          <div className="col-lg-2">
            small image
          </div>
          <div className="col-lg-4">
            <input id="smallImage" name="smallImage" onChange={this.handleChange}/>
          </div>

            </div>
             <div className="row">
          <div className="col-lg-2">
            &nbsp;
          </div>
          <div className="col-lg-4">
            <button type="button" className="btn btn-primary" onClick = {this.createProduct}>Add</button>
          </div>

            </div>

            <br />
            <br />
           
            <div className="row">
          <div className="col-lg-2">
            Product Id
          </div>
          <div className="col-lg-2">
            <input type="text" id="productId" name="productId" onChange={this.handleChange}/>
          </div>
          </div>

            <div className="row">
          <div className="col-lg-2">
            Weight
          </div>
          <div className="col-lg-2">
            <input type="text" id="weight" name="weight" onChange={this.handleChange}/>
          </div>
          </div>
          <div className="row">
          <div className="col-lg-2">
            Price
          </div>
          <div className="col-lg-2">
            <input type="text" id="price" name="price" onChange={this.handleChange}/>
          </div>
          </div>
          <div className="row">
          <div className="col-lg-2">
            discount
          </div>
          <div className="col-lg-2">
            <input type="discount" id="price" name="discount" onChange={this.handleChange}/>
          </div>
          </div>
          <div className="row">
          <div className="col-lg-2">
            &nbsp;
          </div>
          <div className="col-lg-4">
            <button type="button" className="btn btn-primary" onClick = {this.createProductPrice}>Add Price</button>
          </div>

            </div>
            </div>

  }
}
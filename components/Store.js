import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import $ from 'jquery';
import Category from './Category';
import CategoryAction from '../actions/CategoryAction';
import GroceryConstants from '../constants/GroceryConstants'; 
import CommonStore from '../stores/CommonStore'; 
export default class Store extends Component{

  constructor(props){
    super(props);
    this.state ={"banner":"amazon.jpg",config:{},"login":"hide"}
    this.checkLoginState = this.checkLoginState.bind(this);
    this.loginResponse = this.loginResponse.bind(this);
    this._onProductsChange = this._onProductsChange.bind(this);
    this.init();
  }
  
  getBanner(){
    if(this.props.shopId == "1"){
      return "amazon.jpg";
    }else{
      return "walmart-banner.jpg";
    }

  }
  init(){
    let cAction = new CategoryAction(); 
   
    cAction.getProductsByShop({shopId:this.props.shopId},"getProductsByShopHome");
    this.checkLoginState();
  }
 componentWillReceiveProps(nextProps){
    this.props=nextProps;
    this.init();
  }
   
  componentDidMount() {
    CommonStore.addChangeListener(GroceryConstants.PRODUCTS_BY_SHOP,this._onProductsChange);
    
  }
  componentWillUnmount() {
    CommonStore.removeChangeListener(GroceryConstants.PRODUCTS_BY_SHOP,this._onProductsChange);
    
  }
  statusChangeCallback(response) {
           console.log(response);
        }
  loginResponse(response){
    
     if(response.status != "connected"){
                
                this.setState({"login":"show"});
              }
               console.log(response);
               console.log(response.authResponse);
              
                FB.api('/me', function(res) 
    {
        console.log(res);
        console.log ("Welcome " + res.name + ": Your UID is " + res.id); 
    });
  }
checkLoginState() {
 
            console.log("Checking the login ....");
           //  FB.getLoginStatus(this.loginResponse,true);
        
        }
  _onProductsChange(data){
    
    this.setState({config:data.data});
   
  }
	render() {
    
    let Items;
    let fieldList = [];
    
    if(this.state.config.priority){
      let orders = this.state.config.priority.split(",");
      for( let j =0;j<orders.length;j++){
         let v = orders[j];
         let title = this.state.config.categories[v];
         fieldList.push(<Category shopId={this.props.shopId} categoryId={orders[j]} data = {this.state.config.products[v]} title={title} />)
      }
       
    }
    
    let banner = this.getBanner();
    return (<div>
      
      <div id="topBanner" style={{"marginTop" :"10px"}}>
      <img src={"imgs/"+banner} />
      
     </div>
     {fieldList}
     <br/>
     
     </div>);
  }


  
};
module.exports = Store;

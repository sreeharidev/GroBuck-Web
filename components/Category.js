import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import GroceryConstants from '../constants/GroceryConstants'; 
import CommonStore from '../stores/CommonStore'; 
import CategoryAction from '../actions/CategoryAction';
import Utils from './Utils';
export default class Category extends Component{
  constructor(props){

    super(props);
    this.title = this.props.title;
    this.categoryId=this.props.categoryId;
    this.shopId=this.props.shopId;
    this.onProductClick = this.onProductClick.bind(this);
    this._onProductsChange = this._onProductsChange.bind(this);
    this.init = this.init.bind(this);
    this.state={data:this.props.data,shopId:this.shopId,};

    //this.init();

  }
  init(){
    let cAction = new CategoryAction(); 
    cAction.getProductsByCategory({shopId:this.props.shopId,"categoryId":this.props.categoryId},"getProductsByCategory");
  }
  componentWillReceiveProps(nextProps){
    this.props=nextProps;
    this.title = this.props.title;
    this.categoryId=this.props.categoryId;
    this.shopId=this.props.shopId;
    this.setState({data:this.props.data});
    //this.init();
  }
  componentDidMount() {
    CommonStore.addChangeListener(GroceryConstants.PRODUCTS_BY_CATEGORY+this.categoryId,this._onProductsChange);
  }
  componentWillUnmount() {
    CommonStore.removeChangeListener(GroceryConstants.PRODUCTS_BY_CATEGORY+this.categoryId,this._onProductsChange);
  }
  _onProductsChange(data){
    this.setState(data);  
  }
  addToCart(){
    alert('add');
  }
  onProductClick(item){
    this.setState(item);
    $('#product-modal').modal('show');
    $('#product-modal').css('overflow-y', 'auto'); 
    $('#product-modal').css('max-height', $(window).height() * 0.7);

    $('.tile')
    // tile mouse actions
    .on('mouseover', function(){
      $(this).children('.photo').css({'transform': 'scale('+ $(this).attr('data-scale') +')'});
    })
    .on('mouseout', function(){
      $(this).children('.photo').css({'transform': 'scale(1)'});
    })
    .on('mousemove', function(e){
      $(this).children('.photo').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
    })
    // tiles set up
    .each(function(){
      $(this)
        // add a photo container
        .append('<div class="photo"></div>')
        // some text just to show zoom level on current item in this example
         // set up a background image for each tile based on data-image attribute
        .children('.photo').css({'background-image': 'url(/imgs/'+ item.smallImage +')'});
    });

  }
  render(){
    
    let Items = this.state.data.map((item,index) =>
        <li className="item-card " role="link" data-toggle="modal" onClick={event=>{this.onProductClick(item)}}>
                    <div className="item-card-image-wrapper">
                      <img className="no-aliasing-image item-image" src={"/imgs/"+item.smallImage} alt="Frontier Soups Wild Rice &amp; Mushroom Soup Mix" />
                    </div>
                    <div className="item-name">
                      <div>
                        <div className="item-price">
                          <span className=""><b>Rs:{item.price}</b></span>
                        </div>
                      </div>
                      <span className="full-item-name">{item.productName} - {item.productDescription}
                      </span>
                      <span className="item-size muted"><span>{item.weight} kg</span></span>
                      <div style={{marginTop:"20px",marginLeft:"120px"}}><button type="button" onClick={this.addToCart} className="btn btn-success">+Add</button></div>
                    </div>
                  </li>
      );
     
    return <div >
              <div className="modal fade modal-wide" id="product-modal" role="dialog">
    <div className="modal-dialog"  >
     <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">{this.state.productName}</h4>
        </div>
        <div className="modal-body" style={{height:"300px"}}>
           <div className="col-md-7">
            <div className="tiles" style={{height:"300px",width:"800px"}}> 
            <div className="tile" data-scale="2.1" data-image={"/imgs/"+this.state.smallImage}></div>
            </div>
           </div>
          <div className="col-md-5">
            def
           </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
              
                <div className="col-lg-12" style={{marginLeft:"-15px",marginBottom:"20px"}}>
                  <h5 style={{marginLeft:"15px"}}>{this.title}</h5>
                  {Items}
                </div>
            </div>;
  }
}
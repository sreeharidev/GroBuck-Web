import React, {Component, PropTypes} from 'react';
import Layout from './Layout';
export default class Index extends Component{

  constructor(props){
    super(props);
    this.setId = this.setId.bind(this);
    this.state ={"shopId":1,logo:"walmart.jpg"};
  }
   
  setId(id){
    let logo = (id == 1)?"walmart.jpg":"Lulu_Logo.png";
    console.log(id);
    this.setState({shopId:id,logo:logo});

  }
  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       shopId: this.state.shopId
     })
    );
    return (<div>
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
    <div className="container">
        <div className="navbar-header page-scroll">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand page-scroll" href="#page-top">GroBuck</a>
        </div>
        <div className="collapse navbar-collapse navbar-ex1-collapse">
            <ul className="nav navbar-nav">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Stores <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                        <li onClick={(event) =>this.setId(1)}><a href="#">Walmart</a></li>
                        <li onClick={(event) =>this.setId(2)}><a href="#">LuLu Hyper Market</a></li>
                    </ul>
                </li>
            
            </ul>
        </div>
     </div>
     <div className="col-sm-3 col-md-3 " style={{marginLeft:"130px"}}>
        <img src={"imgs/"+this.state.logo} height="20px" width="80px"/>
     </div>
     <div className="col-sm-3 col-md-3 ">
    <form className="navbar-form" role="search">
      <div className="input-group">
      <input type="text" className="form-control" size="70" placeholder="Search" name="srch-term" id="srch-term" />
      <div className="input-group-btn">
        <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
      </div>
      
      </div>
    </form>

    </div>
     <div className=" pull-right" style={{marginRight:"10px"}}>
      <a href="#" className="btn btn-info btn-sm">
              <span className="glyphicon glyphicon-shopping-cart" ></span>Cart
            </a>
        </div>
       
    </nav>
    
    
      <Layout user={userid}>
        {childrenWithProps}
      </Layout>
    </div>
    );
  }
};
module.exports = Index;
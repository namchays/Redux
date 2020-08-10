import React, { Component } from 'react'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      keyWord : ''
    })
  }

  onChange = (event) =>{
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name] : value
    })
   
  }
  onSearch = () =>{
    this.props.onSearch(this.state.keyWord);
   
  }
    render() {
    
        return (
            <div>
                   <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Nhập từ khóa..."  name="keyWord" onChange = {this.onChange}/>
                    <span className="input-group-btn">
                      <button className="btn btn-primary" type="button"  onClick = {this.onSearch} >
                        <span className="fa fa-search mr-5" />Tìm
                    </button>
                    </span>
                  </div>
                </div>
            </div>
        )
    }
}

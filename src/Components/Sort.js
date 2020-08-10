import React, { Component } from 'react'

export default class Sort extends Component {
    constructor(props) {
      super(props)
      this.state = ({
        sort : {
          by : 'name',
        }
      })
    }
    onClick = (e,sortBy, sortValue) =>{
      e.preventDefault();
      this.props.onSort(sortBy,sortValue);
    }
    render() {
      var {sortBy,sortValue} = this.props;
    
        return (
            <div>
                   <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                      <li>
                        <a  href=" " className ={(sortBy ==='name' && sortValue === 1) ? 'sort-selected' : ''}
                         onClick = {(e) => this.onClick(e,'name', 1)}
                           >
                          <span className="fa fa-sort-alpha-asc pr-5 " > &nbsp;
                            Tên A-Z
                          </span>
                        </a>
                      </li>
                      <li>
                        <a  href=" " className ={(sortBy ==='name' && sortValue === -1) ? 'sort-selected' : ''} onClick = {(e) => this.onClick(e,'name', -1)}>
                          <span className="fa fa-sort-alpha-desc pr-5">&nbsp;
                            Tên Z-A
                           </span>
                        </a>
                      </li>
                      <li role="separator" className="divider" />
                      <li><a  href=" " className ={(sortBy ==='status' && sortValue === 1) ? 'sort-selected' : ''} onClick = {(e) => this.onClick(e,'status', 1)}>Trạng Thái Kích Hoạt</a></li>
                      <li><a  href=" " className ={(sortBy ==='status' && sortValue === -1) ? 'sort-selected' : ''} onClick = {(e) => this.onClick(e,'status', -1)}>Trạng Thái Ẩn</a></li>
                    </ul>
                  </div>
                </div>
            </div>
        )
    }
}

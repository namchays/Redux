import React, { Component } from 'react'


export default class taskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id : '',
      name: '',
      status: false

    }
  }
  UNSAFE_componentWillMount(){
    if(this.props.taskEditing !== null){
    this.setState({
      id : this.props.taskEditing.id,
      name : this.props.taskEditing.name,
      status : this.props.taskEditing.status
    });
    } 
    
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.taskEditing) {
      this.setState({
        id : nextProps.taskEditing.id,
        name : nextProps.taskEditing.name,
        status : nextProps.taskEditing.status
      }) 
    } else if(!nextProps.taskEditing ){
      this.setState({
        id : '',
      name: '',
      status: false
      })
    }
  }
  onChange = (event) =>{
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name] : value
    });
  }
  onClick = () => {
    this.props.onCloseForm();
  }
  onSubmit = (event) =>{
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.OnCancel();
    this.onClick();
  }
  OnCancel = () => {
    this.setState({name: '' , status : false});

  }
  render() {
 
    return (
      <div>
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">{this.state.id === '' ? "Thêm công việc" : "Sửa công việc" }
                  <span className="fa fa-times-circle text-right" onClick={() => this.onClick()}></span>
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit = {this.onSubmit}>
              <div className="form-group">
                <label>Tên :</label>
                <input 
                type="text" 
                className="form-control" 
                name="name"
                value = {this.state.name}
                onChange = {this.onChange}
             />
              </div>
              <label>Trạng Thái :</label>
              <select 
              className="form-control" 
              required="required"
              name = "status"
              value = {this.state.status}
              onChange ={this.onChange}
              >
                <option value ={true}>Kích Hoạt</option>
                <option value ={false}>Ẩn</option>
              </select>
              <br />
              <div className="text-center">
             <button type="submit" className="btn btn-warning">{this.state.id === '' ? "Thêm" : "Sửa"}</button>&nbsp;
                <button type="button" className="btn btn-danger" onClick = {this.OnCancel}>
                   <span className = "fa fa-close mr-5"></span>
                    Hủy Bỏ
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

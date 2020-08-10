import React, { Component } from 'react'

export default class componentName extends Component {

  
  OnUpdateStatus = () =>{
       
    this.props.onUpdateStatus(this.props.task.id);
  }
  onDeleteStatus = () => {
    this.props.onDeleteStatus(this.props.index);
  }

  editStatus = () => {
      this.props.editStatus(this.props.task.id);
      
  }    
      
     render() {
   
      var {task, index} = this.props;
      if(task.status ==='true') task.status = true;
        return (
             <tr>
                        <td>{index+1}</td>
                        <td>{task.name}</td>
                        <td className="text-center">
                          <span 
                              className={task.status === true ? "label label-success" : "label label-danger"}
                              onClick = {this.OnUpdateStatus}
                        
                          >
                            {task.status === true ? 'Kích hoạt' : 'Ẩn'}
                        </span>
                          </td>
                        <td className="text-center">
                          <button type="button" className="btn btn-warning"   onClick = {this.editStatus}>
                            <span className="fa fa-pencil mr-5" 
                            
                            />Sửa

                         </button>
                        &nbsp;
                     <button type="button" className="btn btn-danger" onClick ={this.onDeleteStatus}>
                            <span className="fa fa-trash mr-5" />Xóa
                         </button>
                        </td>
                      </tr>
           
        )
    }
}

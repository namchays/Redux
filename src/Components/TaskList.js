import React, { Component } from 'react'
import TaskItem from './TaskItem'
export default class componentName extends Component {
    constructor(props) {
      super(props)
      this.state = ({
        filterName : '',
        filterStatus : 0
      })
    }
    onChange = (event) => {
      var target = event.target;
      var name = target.name;
      var value = target.value;
      // this.setState({
      //   [name] : value
      // })
      this.props.onFilter(name === 'filterName' ? value : this.state.filterName,
        name === 'filterStatus' ? value : this.state.filterStatus
      )
        // console.log(name+value);
    }
    

    render() {
      var {tasks} = this.props;
      var element = tasks.map((task, index)=>{
        return     <TaskItem task = {task} key={task.id} index={index}
         onUpdateStatus = {this.props.onUpdateStatus }
         onDeleteStatus = {this.props.onDeleteStatus} 
         editStatus = {this.props.editStatus}
         />
       });
        return (
            <div>
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td />
                        <td>
                          <input type="text" className="form-control" name = "filterName" onChange = {this.onChange}/>
                        </td>
                        <td>
                          <select className="form-control" name = "filterStatus" onChange = {this.onChange}>
                            <option value={0}>Tất Cả</option>
                            <option value={-1}>Ẩn</option>
                            <option value={1}>Kích Hoạt</option>
                          </select>
                        </td>
                        <td />
                      </tr>
                      {element}
                    </tbody>
                  </table>
            </div>
        )
    }
}

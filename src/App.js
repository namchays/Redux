import React, { Component } from 'react'
import './App.css'
import TaskForm from './Components/TaskForm'
import Control from './Components/Control'
import TaskList from './Components/TaskList'
import _ from 'lodash'
import Demo from './trainning/Demo'
export default class componentName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      isDisplayForm: true,
      taskEditing : null,
      filter : {
        filterName : '',
        filterStatus : 0
      },
      keyWord : '',
      sortBy : 'name',
      sortValue : 1
    };
  }

  UNSAFE_componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({tasks: tasks})

    }

  
  }
  findIndex = (id) =>{
    var {tasks} = this.state;
    var res = -1;
    tasks.forEach((task, index) =>{
      if(task.id === id) return res = index;
    });
    return res;
  }

  s4() {
    return Math.floor((1 + Math.random() * 0x10000)).toString(16).substring(1);
  }
  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4()
      + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  }
  OnAddJob = () =>{
   
    var {isDisplayForm, taskEditing} = this.state;
    if(isDisplayForm && taskEditing !== null){
      this.setState({
        isDisplayForm : true,
        taskEditing : null
      })
    } else{
         this.setState(
      {
        isDisplayForm : !this.state.isDisplayForm,
        taskEditing : null        
      });
    }

 
    

  }
  onCloseForm = () => {
    this.setState({isDisplayForm : false});
  }
  onSubmit = (data) =>{
  
    var {tasks} = this.state;
    if(data.id === ''){
       
        var task = {id : this.generateID(), name: data.name, status: data.status === "true" ? true : false}
        tasks.push(task);
       
    }

    else
        {
          
         var index = this.findIndex(data.id)
     
      
         tasks[index] = data;
          
         }
      this.setState({tasks : tasks, isDisplayForm : null });
      localStorage.setItem('tasks',JSON.stringify(tasks));
 

    }
  onUpdateStatus = (id) =>{
    var {tasks} = this.state;
    var result = tasks.map((task) => {
      if(task.id === id) task.status = !task.status;
      return task;
    });
    this.setState({tasks :result});
    localStorage.setItem('tasks', JSON.stringify(tasks))

  }
  onDeleteStatus = (index) =>{
    var {tasks} = this.state;
  
    tasks.splice(index, 1);
  
    this.setState({tasks : tasks});
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.setState({isDisplayForm : false})
  }

  editStatus = (id) => {
    
    var {tasks} = this.state;
    // var index = this.findIndex(id);
    var index = _.findIndex(tasks,(task) =>{
      return task.id === id
    })
    this.setState({isDisplayForm : true});
    var taskEditing = tasks[index];
    this.setState({taskEditing : taskEditing});
    localStorage.setItem('taskEditing',JSON.stringify(taskEditing));

  } 
  onFilter = (filterName, filterStatus) =>{
    filterStatus = parseInt(filterStatus,10)
    this.setState ({
     filter : {
      filterName : filterName,
      filterStatus : filterStatus
     }
    })

  } 
  onSearch = (params) =>{
    this.setState({
      keyWord : params
    })

  }
  onSort = (sortBy, sortValue) =>{
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    })
  }
    render() {
    
    var {tasks, isDisplayForm, filter, keyWord, sortBy,sortValue} = this.state;
   
    if(filter){
      if(filter.filterName){
         tasks = tasks.filter((e) => {
          return e.name.toLocaleLowerCase().search(filter.filterName.toLocaleLowerCase()) !== -1;
        })
       
      }
      tasks = tasks.filter((e) => {
        return filter.filterStatus === 0 ? e : (filter.filterStatus === -1 ? (e.status === false) :( e.status === true));
      })
   }
   if(keyWord.length > 0){
    tasks = tasks.filter((e) =>{
       return e.name.toLocaleLowerCase().search(keyWord.toLocaleLowerCase()) !== -1;
     })
   }
   if(sortBy === 'name'){
    tasks.sort((a,b) =>{
     if(a.name > b.name) return sortValue;
     else if(a.name < b.name) return -sortValue;
     else return 0;
    })
   }
   if(sortBy === 'status'){
     tasks.sort((a,b) =>{
       if(a.status < b.status) return sortValue;
       else if(a.status > b.status) return -sortValue;
       else return 0;
     })
   }
   
  
    var element = isDisplayForm ? <TaskForm 
                                      onCloseForm = {this.onCloseForm} 
                                      onSubmit ={this.onSubmit} 
                                      taskEditing ={this.state.taskEditing} /> 
                                      : '';
    return (
      <div>

        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div className="row">
            <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
              {element}
            </div>
            <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8": "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
              <button type="button" className="btn btn-primary" onClick={() => this.OnAddJob()}>
                <span className="fa fa-plus mr-5" />Thêm Công Việc
        </button>
             
              <Control onSearch = {this.onSearch} onSort = {this.onSort} sortBy = {sortBy} sortValue ={sortValue}/>
              <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList
                          tasks = {tasks}
                          onUpdateStatus = {this.onUpdateStatus}
                          onDeleteStatus = {this.onDeleteStatus} 
                          editStatus = {this.editStatus} 
                          onFilter = {this.onFilter}
                     />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

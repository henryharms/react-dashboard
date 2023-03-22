import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <li onClick={this.props.crossout} style={{textDecorationLine: this.props.crossoutStatus ? 'line-through' : 'none'}}>{this.props.item}</li>
    );
  }
}




class TodoList extends React.Component {
  
  constructor(props) {
    super(props);

    this.crossout = this.crossout.bind(this);
    this.addTask = this.addTask.bind(this);

    this.state = {tasks:[],status:[]};
  }

  componentDidMount()
  {
    for(let i = 0; i<10; i++){
      this.addTask(i);
      console.log(i);
    }
  }

  addTask(task) {
    let newTasks = this.state.tasks;
    newTasks.push(task);
    this.setState({tasks: newTasks});

    let newStatus = this.state.status;
    newStatus.push(false);
    this.setState({status:newStatus});
  }

  crossout(task) {
    let index = this.state.tasks.indexOf(task);
    let newStatus = [...this.state.status];
    newStatus[index] = !newStatus[index];
    this.setState({status: newStatus});
  }

  onKeyUp = (event) => {
//fix this

  }

  render() {
    return (
      <div className='todo' style={{gridColumn: `${this.props.x} / span 3`, gridRow: `${this.props.y} / span 5`}}>

          <h2 className='header'>To-Do List</h2>
          <div style={{top:'1%',height:"70%", overflowY: "auto", position:"relative"}}>
            <ul>
              {this.state.tasks.map((task, index)=>
              (<TodoListItem 
              key={`${index}${task}`} 
              item={task}
              crossout = {() => this.crossout(task)}
              crossoutStatus={this.state.status[index]}/>))}
            </ul>
          </div>
          <input onKeyDown={this.onkey}></input>
      </div>
    );
  }
}




class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="App">
        <div className='test'></div>
        <TodoList x={5} y={1}/>
      </div>
    );
  }

}

















ReactDOM.render(
  <Dashboard/>,
  document.getElementById('root')
);

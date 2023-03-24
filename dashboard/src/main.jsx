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
    this.hide = this.hide.bind(this);

    this.state = {tasks:[],status:[]};
  }

  componentDidMount()
  {
    // for(let i = 0; i<10; i++){ //testing with some starter values
    //   this.addTask(i);
    //   console.log(i);
    // }
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
    let newStatus = this.state.status;
    newStatus[index] = !newStatus[index];
    console.log(newStatus);
    this.setState({status: newStatus});
  }

  onKeyUp = (event) => {
    let tasks = this.state.tasks;
    if (event.key === "Enter" && event.target.value != ""){
      if (String(event.target.value) == "clear") {
        let newTasks = [];
        let newStatus = [];
        for (let i = 0; i < tasks.length; i++) {
          if (this.state.status[i] != true) {
            console.log('we gotta get rid of these');
            newTasks.push(tasks[i]);
            newStatus.push(false);
          }
        }
        console.log(newTasks, newStatus);
        this.setState({tasks:newTasks,status:newStatus});
        event.target.value = "";
        return;
      }

      if (!this.state.tasks.includes(String(event.target.value))) {
        this.addTask(String(event.target.value));
      } else {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
      }
      event.target.value = "";
    }

  }
  hide() { //broken rn, fix later
    console.log("yes");
    //this.style.display = 'none';
  }

  render() {
    return (
      <div className='todo' style={{gridColumn: `${this.props.x} / span 4`, gridRow: `${this.props.y} / span 6`}}>
        <div>
          <h2 className='header'>To-Do List</h2>
          </div>
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
          <div style={{display:'flex',width:'100%',alignContent:'center',justifyContent:'center'}}>
            <input onKeyDown={this.onKeyUp}></input>
          </div>
      </div>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.startTimer = this.startTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {started:false,endTime:0};
  }
  startTimer() {
    let d = new Date();
    let newEnd = d.getTime() + 1800000;
//    console.log(newEnd);
    this.setState({started:true,endTime:newEnd});
//    console.log('we go');
  }
  reset() {
    this.setState({started:false});
  }
  componentDidMount() {
    setInterval(()=>{
      if(this.state.started) {
      this.setState({});}
    },1000);
  }
  render() {
    let time;
    let minutes;
    let seconds;
    let timerInside;
    let button;

    if (this.state.started) {
      let d = new Date();
      time = this.state.endTime - d.getTime();
      minutes = Math.floor(time/60000);
      seconds = time/60000 - Math.floor(time/60000)
      seconds = seconds * 60;
      if (seconds < 10) {
        timerInside = String(minutes) + ':0' + String(Math.floor(seconds));
      } else {
        timerInside = String(minutes) + ':' + String(Math.floor(seconds));
      }
      if (minutes < 0) {
        timerInside = "Done!"
      }
    } else {
      timerInside = '30:00';
    }
    if (this.state.started) {
      button = <button onClick={()=> this.reset()}>Stop</button>
    } else {
      button = <button onClick={() => this.startTimer()}>Start Timer</button>;
    }

    return(
    <div className='timer' style={{gridColumn: `${this.props.x} / span 4`, gridRow: `${this.props.y} / span 4`}}>
      <div>
        <h2 className='header'>Timer</h2>
      </div>
      <div className='centered'>
        <h1 id='timerNumber'>{timerInside}</h1>
      </div>
      <div style={{display:'flex',width:'100%',alignContent:'center',justifyContent:'center'}}>
        {button}
      </div>
    </div>
    );
  }
}

class WaterTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {waterLevel:100};
  }
  render() {
    console.log("printing");
    return(
    <div className='tracker' style={{gridColumn: `${this.props.x} / span 3`, gridRow: `${this.props.y} / span 4`}}>
      <div>
        <h2 className='header'>Water</h2>
      </div>
    </div> 
    );
  }
}





class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {compoments:[<TodoList x={5} y={1}/>,
    <Timer x={1} y ={1}/>,<WaterTracker x={9} y={1}/>],status:[true,true,true], type:['Todo List','Timer','Water']};
  }
  hide(i) {
    let status = this.state.status;
    status[i] = !status[i];
    this.setState({status:status});
  }
  render() {
    let all = [];
    let allchecks = [];
    let comps = this.state.compoments;
    let statuses = this.state.status;
    for (let i = 0; i < comps.length; i++) {
      if (statuses[i]) {
        all.push(comps[i]);
      }
      allchecks.push(<input type="checkbox" onClick={() => this.hide(i)}/>);
      allchecks.push(<label>{this.state.type[i]}</label>);
    }
    return (
      <div className="App">
        <div className='toggle'>
          <div>
            <h2 className='header'>Toggle Widgets</h2>
          </div>  
          <div>
            {allchecks}
          </div>
        </div>
        {all}
      </div>
    );
  }

}

















ReactDOM.render(
  <Dashboard/>,
  document.getElementById('root')
);

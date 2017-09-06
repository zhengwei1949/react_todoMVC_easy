import React,{Component} from 'react';
import { createStore } from 'redux'

let reducer = (state={list:[
  {'name':'吃饭11','completed':false},
  {'name':'睡觉','completed':true},
  {'name':'打豆豆','completed':false},
],filterType:'all'},action)=>{
  let list;
  switch(action.type){
    case 'ADD_TODO':
    //  console.log(action.text)
    //   console.log(state.list);
      return {list:[...state.list,{name:action.text,completed:false}],filterType:state.filterType};
    case 'DELETE_TODO':
      list = state.list;
      list.splice(action.index,1);
      //状态具有不变性，每次都要返回一个新的对象
      return {list:[...list],filterType:state.filterType};
    case 'TOGGLE_ONE':
      list = state.list;
      list[action.index].completed = !list[action.index].completed;
      return {list:[...list],filterType:state.filterType};
    case 'TOGGLE_ALL':
      list = state.list;
      list = list.map((item)=>{item.completed = action.bool;return item;});
      return {list:[...list],filterType:state.filterType};
    case 'TOGGLE_SHOW':
    return {list:[...state.list],filterType:action.filterType};
    default:
      return state;
  }
}

let store = createStore(reducer);

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      list:store.getState().list,
      filterType:store.getState().filterType
    };
  }
  componentWillMount() {
    store.subscribe(()=>{
      this.setState({
        list:store.getState().list,
        filterType:store.getState().filterType
      })
    })
  }
  handleKeyUp = (event)=>{
    if(event.keyCode === 13 && event.target.value.length > 0){
      store.dispatch({
        type:'ADD_TODO',
        text:event.target.value
      });
      event.target.value = '';
    }
  }
  handleChange = (index)=>{
    store.dispatch({
      type:'TOGGLE_ONE',
      index:index
    })
  }
  handleToggleAll = (event)=>{
    store.dispatch({
      type:'TOGGLE_ALL',
      bool:event.target.checked
    })
  }
  handleDelete = (index)=>{
    store.dispatch({
      type:'DELETE_TODO',
      index:index
    })
  }
  handleToggleShow = (type)=>{
    store.dispatch({
      type:'TOGGLE_SHOW',
      filterType:type
    })
  }
  render(){
    let filterType = this.state.filterType;
    let myTodos = this.state.list.filter((item)=>{
      switch(filterType){
        case 'all':
          return true;
        case false:
          return item.completed === false;
        case true:
          return item.completed === true;
        default:
          return true;
      }
    })

    return <div>
      <div><input type="text" onKeyDown={this.handleKeyUp} /></div>
      <div>
      <span>全选</span><input type="checkbox" onChange={this.handleToggleAll} />
      </div>
      <ul>
        {
          myTodos.map((item,index)=>{
            return <li key={index}>
                      <input type='checkbox' checked={item.completed} onChange={this.handleChange.bind(this,index)} />
                      <span style={{textDecoration:item.completed?'line-through':''}}>{item.name}</span>
                      <span style={{color:'red'}} onClick={this.handleDelete.bind(this,index)} >X</span>
                    </li>
          })
        }
      </ul>
      <div>{this.state.list.filter((item)=>{return item.completed === false}).length}</div>
      <div><button onClick={this.handleToggleShow.bind(this,'all')}>全部</button><button onClick={this.handleToggleShow.bind(this,false)}>未完成</button><button onClick={this.handleToggleShow.bind(this,true)}>已完成</button></div>
    </div>
  }
}
export default App;

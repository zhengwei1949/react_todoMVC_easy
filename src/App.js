import React,{Component} from 'react';
import NewItem from './NewItem';
import All from './All';
import Item from './Item';
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      'list':[
        {'name':'吃饭','completed':false},
        {'name':'睡觉','completed':true},
        {'name':'打豆豆','completed':false},
      ],
      filterType:null
    }
  }
  handleKeyUp = (event)=>{
    if(event.keyCode === 13 && event.target.value.length > 0){
      let list = this.state.list;
      list.push({name:event.target.value,completed:false});
      this.setState({list:list});
      event.target.value = '';
    }
  }
  handleChange = (index)=>{
    // console.log(index)
    let list = this.state.list;
    list[index].completed = !list[index].completed;
    this.setState({list:list})
  }
  handleToggleAll = (event)=>{
    // console.log(event.target.checked)
    let myBool = event.target.checked;
    let list = this.state.list;
    for(let i=0;i<list.length;i++){
      list[i].completed = myBool;
    }
    this.setState({list:list})
  }
  handleDelete = (index)=>{
    // console.log(index);
    let list = this.state.list;
    list.splice(index,1);
    this.setState({
      list:list
    })
  }
  handleToggleShow = (type)=>{
    // console.log(type)
    if(type === true){
      this.setState({filterType:true})
    }else if(type === false){
      this.setState({filterType:false})
    }else{
      this.setState({filterType:null})
    }
  }
  render(){
    let filterType = this.state.filterType;
    let myTodos = this.state.list.filter((item)=>{
      switch(filterType){
        case null:
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
      <NewItem handleKeyUp={this.handleKeyUp} />
      <All handleToggleAll={this.handleToggleAll} />
      <ul>
        {
          myTodos.map((item,index)=>{
            return <Item key={index} index={index} item={item}  handleChange={this.handleChange} handleDelete={this.handleDelete} />
          })
        }
      </ul>
      <div>{this.state.list.filter((item)=>{return item.completed === false}).length}</div>
      <div><button onClick={this.handleToggleShow.bind(this,null)}>全部</button><button onClick={this.handleToggleShow.bind(this,false)}>未完成</button><button onClick={this.handleToggleShow.bind(this,true)}>已完成</button></div>
    </div>
  }
}
export default App;

import React,{Component} from 'react';
export default class Item extends Component{
    handleChange = (index)=>{
        this.props.handleChange(index);
    }
    handleDelete = (index)=>{
        this.props.handleDelete(index);
    }
    render(){
        return <li >
        <input type='checkbox' checked={this.props.item.completed} onChange={this.handleChange.bind(this,this.props.index)} />
        <span style={{textDecoration:this.props.item.completed?'line-through':''}}>{this.props.item.name}</span>
        <span style={{color:'red'}} onClick={this.handleDelete.bind(this,this.props.index)} >X</span>
      </li>
    }
}
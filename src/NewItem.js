import React,{Component} from 'react';
export default class NewItem extends Component{
    handleKeyUp = (event)=>{
        this.props.handleKeyUp(event);
    }
    render(){
        return <div><input type="text" onKeyDown={this.handleKeyUp} /></div>
    }
}

import React,{Component} from 'react';
export default class All extends Component{
    handleToggleAll = (event)=>{
        this.props.handleToggleAll(event);
    }
    render(){
        return <div>
            <span>全选</span><input type="checkbox" onChange={this.handleToggleAll} />
        </div>
    }
}
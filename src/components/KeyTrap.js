import React from 'react';


export default class KeyTrap extends React.Component{
    constructor(props){
        super(props);
        this.handleKeyUpEvent = this.handleKeyUpEvent.bind(this);
        this._triggers = props.triggers.split(',');
    }

    componentWillMount(){
        document.addEventListener('keyup', this.handleKeyUpEvent);
    }

    handleKeyUpEvent(e) {
        if(e.shiftKey && this.shouldKeyBeTrapped(e.key)){
            this.props.onTrapTriggered();
        }
      }

    shouldKeyBeTrapped(keyCode){
        for(let i=0; i<this._triggers.length; i++){
            if(this._triggers[i].toUpperCase() === keyCode){
                return true;
            }
        }
        return false;
    }

    render(){
        return this.props.children || null;
    }


}
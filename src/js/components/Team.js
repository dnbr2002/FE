import React, { Component } from 'react';

class Team extends Component{
    constructor(props){
        super(props);

        this.state={
            team: []
        }
    }

    handleClick(e){
        e.preventDefault();
        this.setState({team: !this.state.team})
    }

    render(){
        return(
            <div>
                
            </div>
        );
    }
}

export default Team;
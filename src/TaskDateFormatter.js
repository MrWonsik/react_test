import * as React from 'react';

class Date extends React.Component {
  render(){
    return (
      <div>
        <center>
        <b>{this.props.value.substring(0,10)}</b>
        <br/>
        {this.props.value.substring(11,16)}
        </center>
      </div>
    )
  }
  
}


export default Date;

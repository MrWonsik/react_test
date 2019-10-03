import * as React from 'react';
import { Button, Modal} from 'react-bootstrap';
 
 class ModalForRequest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.toggle = this.toggle.bind(this);

  }

  toggle() {
    this.setState( prevState => ({
      show: !prevState.show,
    }));
  }

  render(){
    return (
      <div>
      <Button variant={this.props.buttonVariant} size={this.props.buttonSize || "sm"} onClick={this.toggle}>{this.props.buttonLabel}</Button>
      <Modal show={this.state.show} onHide={this.toggle}>
        <Modal.Body>
          <center>{this.props.modalBody}</center>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={this.toggle}>No</Button>
          <Button variant="primary" size="sm" onClick={this.props.handlerYes}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  }
}

export default ModalForRequest;

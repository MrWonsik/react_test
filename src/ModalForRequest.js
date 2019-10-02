import * as React from 'react';
import { Button, Modal} from 'react-bootstrap';
 
 class ModalForRequest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      modalTitle: "default name",
      modalBody: "some body",
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
        <Modal.Header closeButton>
          <Modal.Title>{this.state.modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.state.modalBody}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={this.props.handlerNo}>No</Button>
          <Button variant="success" onClick={this.props.handlerYes}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  }
}

export default ModalForRequest;

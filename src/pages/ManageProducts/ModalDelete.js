import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ModalDelete = (props) => {
  const { show, onHide, dataModalDelete } = props;
  const handleConfirmDeleteProduct = async () => {};
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this Product: {dataModalDelete.name} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleConfirmDeleteProduct()}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;

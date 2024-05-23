import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteRole } from "../../services/roleService";
import { toast } from "react-toastify";
const ModalDelete = (props) => {
  const { show, onHide, dataModalDelete } = props;
  const handleConfirmDeleteRole = async () => {
    let res = await deleteRole(dataModalDelete);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      onHide();
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this Role: {dataModalDelete.name} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmDeleteRole()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;

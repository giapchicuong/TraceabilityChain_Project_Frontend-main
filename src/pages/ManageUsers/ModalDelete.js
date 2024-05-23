import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../services/userSevices";
import { toast } from "react-toastify";
const ModalDelete = (props) => {
  const { show, onHide, dataModalDelete } = props;
  const handleConfirmDeleteUser = async () => {
    let res = await deleteUser(dataModalDelete);
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
          <Modal.Title>Confirm Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user: {dataModalDelete.email} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmDeleteUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;

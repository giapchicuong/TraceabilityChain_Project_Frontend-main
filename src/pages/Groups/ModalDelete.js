import React, { Group } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteGroup } from "../../services/groupService";
import { toast } from "react-toastify";
const ModalDelete = (props) => {
  const { show, onHide, dataModalDelete } = props;
  const handleConfirmDeleteGroup = async () => {
    let res = await deleteGroup(dataModalDelete);
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
          <Modal.Title>Confirm Delete Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this Group: {dataModalDelete.name} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmDeleteGroup()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;

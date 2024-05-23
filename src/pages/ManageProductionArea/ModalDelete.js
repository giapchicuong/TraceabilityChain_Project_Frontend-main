import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteBlog } from "../../services/blogService";
import { toast } from "react-toastify";
const ModalDelete = (props) => {
  const { show, onHide, dataModalDelete } = props;
  const handleConfirmDeleteBlog = async () => {
    let res = await deleteBlog(dataModalDelete);
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
          <Modal.Title>Confirm Delete Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this Blog: {dataModalDelete.name} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmDeleteBlog()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;

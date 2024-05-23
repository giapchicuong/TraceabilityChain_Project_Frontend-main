import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import { toast } from "react-toastify";
import { createNewGroup, updateGroup } from "../../services/groupService";

const ModalGroup = (props) => {
  const { actionModal, dataModal, show, onHide } = props;
  const defaultInput = {
    name: "",
    description: "",
  };
  const defaultCheckInput = {
    name: true,
    description: true,
  };
  const [modalGroup, setModalGroup] = useState(defaultInput);
  const [validInput, setValidInput] = useState(defaultCheckInput);
  const handleCloseModalGroup = () => {
    onHide();
    setValidInput(defaultCheckInput);
  };
  const checkValidInput = () => {
    if (actionModal === "UPDATE") return true;
    setValidInput(defaultCheckInput);

    const arr = ["name", "description"];
    for (let i = 0; i < arr.length; i++) {
      setValidInput(defaultCheckInput);
      if (!modalGroup[arr[i]]) {
        toast.error(`${arr[i]} is required`);
        setValidInput({ ...defaultCheckInput, [arr[i]]: false });
        return false;
      }
    }
    return true;
  };
  const handleCorfirmGroup = async () => {
    const check = checkValidInput();
    if (check) {
      let res =
        actionModal === "CREATE"
          ? await createNewGroup(modalGroup)
          : await updateGroup(modalGroup);
      if (res && res.EC === 0) {
        setModalGroup(defaultInput);
        toast.success(res.EM);
        onHide();
      } else {
        toast.error(res.EM);
        setValidInput({ ...defaultCheckInput, [res.DT]: false });
      }
    }
  };

  useEffect(() => {
    if (actionModal === "UPDATE") {
      setModalGroup(dataModal);
    }
    if (actionModal === "CREATE") {
      setModalGroup(defaultInput);
    }
  }, [actionModal, dataModal]);

  return (
    <>
      <Offcanvas show={show} onHide={handleCloseModalGroup}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {actionModal === "CREATE" ? "CREATE NEW GROUP" : "EDIT A GROUP"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Name <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="example: admin"
                disabled={actionModal === "CREATE" ? false : true}
                className={validInput.name ? "" : "is-invalid"}
                value={modalGroup.name}
                onChange={(e) =>
                  setModalGroup({ ...modalGroup, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>
                Description <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                placeholder="example: admin groups"
                className={validInput.description ? "" : "is-invalid"}
                value={modalGroup.description}
                onChange={(e) =>
                  setModalGroup({ ...modalGroup, description: e.target.value })
                }
              />
            </Form.Group>{" "}
          </Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Button
              variant="primary"
              style={{ width: "100%", marginTop: 20 }}
              onClick={() => handleCorfirmGroup()}
            >
              {actionModal === "CREATE" ? "SAVE" : "UPDATE"}
            </Button>{" "}
          </Form.Group>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ModalGroup;

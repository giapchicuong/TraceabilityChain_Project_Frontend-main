import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import { toast } from "react-toastify";
import { createNewRole, updateRole } from "../../services/roleService";

const ModalRole = (props) => {
  const { actionModal, dataModal, show, onHide } = props;
  const defaultInput = {
    url: "",
    description: "",
  };
  const defaultCheckInput = {
    url: true,
    description: true,
  };
  const [modalRole, setModalRole] = useState(defaultInput);
  const [validInput, setValidInput] = useState(defaultCheckInput);
  const handleCloseModalRole = () => {
    onHide();
    setValidInput(defaultCheckInput);
  };
  const checkValidInput = () => {
    if (actionModal === "UPDATE") return true;
    setValidInput(defaultCheckInput);

    const arr = ["url", "description"];
    for (let i = 0; i < arr.length; i++) {
      setValidInput(defaultCheckInput);
      if (!modalRole[arr[i]]) {
        toast.error(`${arr[i]} is required`);
        setValidInput({ ...defaultCheckInput, [arr[i]]: false });
        return false;
      }
    }
    return true;
  };
  const handleCorfirmRole = async () => {
    const check = checkValidInput();
    if (check) {
      let res =
        actionModal === "CREATE"
          ? await createNewRole(modalRole)
          : await updateRole(modalRole);
      if (res && res.EC === 0) {
        setModalRole(defaultInput);
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
      setModalRole(dataModal);
    }
    if (actionModal === "CREATE") {
      setModalRole(defaultInput);
    }
  }, [actionModal, dataModal]);

  return (
    <>
      <Offcanvas show={show} onHide={handleCloseModalRole}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {actionModal === "CREATE" ? "CREATE NEW ROLE" : "EDIT A ROLE"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Url <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="example: /role/read"
                disabled={actionModal === "CREATE" ? false : true}
                className={validInput.url ? "" : "is-invalid"}
                value={modalRole.url}
                onChange={(e) =>
                  setModalRole({ ...modalRole, url: e.target.value })
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
                placeholder="example: admin Roles"
                className={validInput.description ? "" : "is-invalid"}
                value={modalRole.description}
                onChange={(e) =>
                  setModalRole({ ...modalRole, description: e.target.value })
                }
              />
            </Form.Group>{" "}
          </Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Button
              variant="primary"
              style={{ width: "100%", marginTop: 20 }}
              onClick={() => handleCorfirmRole()}
            >
              {actionModal === "CREATE" ? "SAVE" : "UPDATE"}
            </Button>{" "}
          </Form.Group>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ModalRole;

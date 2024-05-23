import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import { toast } from "react-toastify";
import { createNewUser, updateUser } from "../../services/userSevices";
import { fetchAllGroup } from "../../services/groupService";
const ModalUser = (props) => {
  const { actionModal, dataModal, show, onHide } = props;
  const defaultInput = {
    email: "",
    username: "",
    password: "",
    phone: "",
    address: "",
    sex: "",
    groupId: "",
  };
  const defaultCheckInput = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    groupId: true,
  };
  const [modalUser, setModalUser] = useState(defaultInput);
  const [validInput, setValidInput] = useState(defaultCheckInput);
  const [listGroups, setListGroups] = useState([]);

  const handleCloseModalUser = () => {
    onHide();
    setValidInput(defaultCheckInput);
  };
  const checkValidInput = () => {
    if (actionModal === "UPDATE") return true;

    setValidInput(defaultCheckInput);
    const arr = [
      "email",
      "password",
      "username",
      "address",
      "phone",
      "sex",
      "groupId",
    ];
    for (let i = 0; i < arr.length; i++) {
      setValidInput(defaultCheckInput);
      if (!modalUser[arr[i]]) {
        toast.error(`${arr[i]} is required`);
        setValidInput({ ...defaultCheckInput, [arr[i]]: false });
        return false;
      }
    }
    // Check email validation
    let regx = /^\S+@\S+\.\S+$/;
    if (!regx.test(modalUser.email)) {
      toast.error("Please enter a valid email address");
      setValidInput({ ...defaultCheckInput, email: false });
      return false;
    }
    return true;
  };
  const handleGetAllGroup = async () => {
    const res = await fetchAllGroup();
    if (res && res.EC === 0) {
      setListGroups(res.DT);
      if (res.DT && res.DT > 0) {
        // let groups = res.DT;
        // setModalUser({ ...modalUser, groupId: groups[0].id });
      }
    } else {
      toast.error(res.EM);
    }
  };
  const handleCorfirmUser = async () => {
    const check = checkValidInput();
    if (check) {
      let res =
        actionModal === "CREATE"
          ? await createNewUser(modalUser)
          : await updateUser(modalUser);
      if (res && res.EC === 0) {
        setModalUser(defaultInput);
        toast.success(res.EM);
        onHide();
      } else {
        toast.error(res.EM);
        setValidInput({ ...defaultCheckInput, [res.DT]: false });
      }
    }
  };

  useEffect(() => {
    handleGetAllGroup();
  }, []);

  useEffect(() => {
    if (actionModal === "UPDATE") {
      setModalUser({
        ...dataModal,
        groupId: dataModal.Group ? dataModal.Group.id : "",
      });
    }
    if (actionModal === "CREATE") {
      setModalUser(defaultInput);
    }
  }, [actionModal, dataModal]);

  return (
    <>
      <Offcanvas show={show} onHide={handleCloseModalUser}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {actionModal === "CREATE" ? "CREATE NEW USER" : "EDIT A USER"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Email address <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                disabled={actionModal === "CREATE" ? false : true}
                placeholder="name@example.com"
                className={validInput.email ? "" : "is-invalid"}
                value={modalUser.email}
                onChange={(e) =>
                  setModalUser({ ...modalUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Phone <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="phone"
                placeholder="0354438249"
                className={validInput.phone ? "" : "is-invalid"}
                value={modalUser.phone}
                disabled={actionModal === "CREATE" ? false : true}
                onChange={(e) =>
                  setModalUser({ ...modalUser, phone: e.target.value })
                }
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {actionModal === "CREATE" && (
                <>
                  <Form.Label>
                    Password <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="123456789"
                    className={validInput.password ? "" : "is-invalid"}
                    value={modalUser.password}
                    onChange={(e) =>
                      setModalUser({ ...modalUser, password: e.target.value })
                    }
                  />
                </>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Username <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="username"
                placeholder="Giáp Chí Cường"
                className={validInput.username ? "" : "is-invalid"}
                value={modalUser.username}
                onChange={(e) =>
                  setModalUser({ ...modalUser, username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Address <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="address"
                placeholder="Bình Dương"
                className={validInput.address ? "" : "is-invalid"}
                value={modalUser.address}
                onChange={(e) =>
                  setModalUser({ ...modalUser, address: e.target.value })
                }
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Sex <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                className={validInput.sex ? "" : "is-invalid"}
                value={modalUser.sex}
                onChange={(e) => {
                  setModalUser({ ...modalUser, sex: e.target.value });
                }}
              >
                <option>Select: Sex</option>
                <option value="0">Male</option>
                <option value="1">Female</option>
                <option value="2">Other</option>
              </Form.Select>
            </Form.Group>{" "}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Group ID <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={modalUser.groupId}
                className={validInput.groupId ? "" : "is-invalid"}
                onChange={(e) => {
                  setModalUser({ ...modalUser, groupId: e.target.value });
                }}
              >
                {listGroups &&
                  listGroups.length > 0 &&
                  listGroups.map((item, index) => {
                    return (
                      <option key={`groupID-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
          </Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Button
              variant="primary"
              style={{ width: "100%", marginTop: 20 }}
              onClick={() => handleCorfirmUser()}
            >
              {actionModal === "CREATE" ? "SAVE" : "UPDATE"}
            </Button>{" "}
          </Form.Group>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ModalUser;

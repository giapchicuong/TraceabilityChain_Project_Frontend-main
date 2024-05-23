import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import { toast } from "react-toastify";
import { createNewBlog, updateBlog } from "../../services/blogService";

const ModalBlog = (props) => {
  const { actionModal, dataModal, show, onHide } = props;
  const defaultInput = {
    name: "",
    description: "",
    typeBlog: "",
    image: "",
  };
  const defaultCheckInput = {
    name: true,
    description: true,
    typeBlog: true,
    image: true,
  };
  const [modalBlog, setModalBlog] = useState(defaultInput);
  const [validInput, setValidInput] = useState(defaultCheckInput);
  
  const handleCloseModalBlog = () => {
    onHide();
    setValidInput(defaultCheckInput);
  };

  const checkValidInput = () => {
    if (actionModal === "UPDATE") return true;
    setValidInput(defaultCheckInput);

    const arr = ["name", "description", "typeBlog", "image"];
    for (let i = 0; i < arr.length; i++) {
      setValidInput(defaultCheckInput);
      if (!modalBlog[arr[i]]) {
        toast.error(`${arr[i]} is required`);
        setValidInput({ ...defaultCheckInput, [arr[i]]: false });
        return false;
      }
    }
    return true;
  };
  const handleCorfirmBlog = async () => {
    const check = checkValidInput();
    if (check) {
      let res =
        actionModal === "CREATE"
          ? await createNewBlog(modalBlog)
          : await updateBlog(modalBlog);
      if (res && res.EC === 0) {
        setModalBlog(defaultInput);

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
      setModalBlog(dataModal);
    }
    if (actionModal === "CREATE") {
      setModalBlog(defaultInput);
    }
  }, [actionModal, dataModal]);

  return (
    <>
      <Offcanvas show={show} onHide={handleCloseModalBlog}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {actionModal === "CREATE" ? "CREATE NEW BLOG" : "EDIT A BLOG"}
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
                placeholder="example: Môn học Công nghệ mới "
                disabled={actionModal === "CREATE" ? false : true}
                className={validInput.name ? "" : "is-invalid"}
                value={modalBlog.name}
                onChange={(e) =>
                  setModalBlog({ ...modalBlog, name: e.target.value })
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
                placeholder="example: admin Blogs"
                className={validInput.description ? "" : "is-invalid"}
                value={modalBlog.description}
                onChange={(e) =>
                  setModalBlog({ ...modalBlog, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Type Blog <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={modalBlog.typeBlog}
                className={validInput.typeBlog ? "" : "is-invalid"}
                onChange={(e) => {
                  setModalBlog({ ...modalBlog, typeBlog: e.target.value });
                }}
              >
                <option>Select: Type of Blogs</option>
                <option value="0">Products</option>
                <option value="1">Prices</option>
                <option value="2">Other</option>
                {/* {listGroups &&
                  listGroups.length > 0 &&
                  listGroups.map((item, index) => {
                    return (
                      <option key={`groupID-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })} */}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>
                Image<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="example: https://www.google.com/ "
                className={validInput.image ? "" : "is-invalid"}
                value={modalBlog.image}
                onChange={(e) =>
                  setModalBlog({ ...modalBlog, image: e.target.value })
                }
              />
            </Form.Group>
          </Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Button
              variant="primary"
              style={{ width: "100%", marginTop: 20 }}
              onClick={() => handleCorfirmBlog()}
            >
              {actionModal === "CREATE" ? "SAVE" : "UPDATE"}
            </Button>{" "}
          </Form.Group>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ModalBlog;

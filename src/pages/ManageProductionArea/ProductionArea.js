import React, { useEffect, useState } from "react";
import "./manageProductionArea.scss";
import { fetchAllBlog } from "../../services/blogService.js";
import { Col, Form, Row } from "react-bootstrap";
import ModalDelete from "./ModalDelete.js";
import ModalProductArea from "./ModalProductArea.js";
const ProductionArea = () => {
  // Data Blog
  const [listBlogs, setListBlogs] = useState([]);
  // Modal Blog
  const [isShowModalBlog, setIsShowModalBlog] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [actionModal, setActionModal] = useState("CREATE");

  // Modal Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState([]);

  function formatVietnamTime(isoString) {
    try {
      const date = new Date(isoString);
      const options = {
        timeZone: "Asia/Ho_Chi_Minh",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };

      const formatter = new Intl.DateTimeFormat("en-GB", options);
      const formattedDate = formatter.format(date);

      return formattedDate;
    } catch (error) {
      console.error("Invalid date:", isoString);
      return "Invalid date";
    }
  }
  const handleGetAllBlogs = async () => {
    const res = await fetchAllBlog();
    if (res && res.EC === 0) {
      setListBlogs(res.DT);
    }
  };

  useEffect(() => {
    handleGetAllBlogs();
  }, []);

  const handleHideModalBlog = async () => {
    setIsShowModalBlog(!isShowModalBlog);
    await handleGetAllBlogs();
  };
  const handleUpdateBlog = (item) => {
    setActionModal("UPDATE");
    setIsShowModalBlog(!isShowModalBlog);
    setDataModal(item);
  };
  const handleCreateBlog = () => {
    setActionModal("CREATE");
    setIsShowModalBlog(!isShowModalBlog);
  };

  const handleHideModalDelete = async () => {
    setIsShowModalDelete(!isShowModalDelete);
    await handleGetAllBlogs();
  };
  const handleDeleteBlog = (item) => {
    setIsShowModalDelete(!isShowModalDelete);
    setDataModalDelete(item);
  };
  return (
    <div className="blogs-container">
      <div className="table-container">
        <div className="table">
          <div className="add-blog">
            <h3>Blogs</h3>
            <button
              className="btn btn-secondary"
              onClick={() => handleCreateBlog()}
            >
              <i class="fa fa-plus" aria-hidden="true"></i>New Blog
            </button>
          </div>

          <div className="action-blog">
            <Form inline>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                  />
                </Col>
              </Row>
            </Form>
            <select class="form-select" aria-label="Default select example">
              <option selected>Sort by: Featured</option>
              <option value="1">Newest</option>
              <option value="1">Oldest</option>
            </select>
          </div>
          <table class="table table-borderless table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                {/* <th scope="col">Description</th> */}
                <th scope="col">Type Blog</th>
                <th scope="col">Date Blog</th>
                <th scope="col">Image</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listBlogs &&
                listBlogs.length > 0 &&
                listBlogs.map((item, index) => {
                  return (
                    <tr key={`rows-${index}`} className="table-row">
                      <th scope="row"> {item.id}</th>
                      <td>{item.name}</td>
                      {/* <td>{item.description}</td> */}
                      <td>{item.typeBlog}</td>
                      <td>
                        {item.updatedAt
                          ? formatVietnamTime(item.updatedAt)
                          : "Unknown date"}
                      </td>
                      <td>
                        <img
                          src={item.image}
                          alt=""
                          width={50}
                          style={{ aspectRatio: "16/9" }}
                        />
                      </td>
                      <td className="actions">
                        <span
                          title="Edit"
                          className="edit"
                          onClick={() => handleUpdateBlog(item)}
                        >
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </span>
                        <span
                          title="Delete"
                          className="delete"
                          onClick={() => handleDeleteBlog(item)}
                        >
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <ModalProductArea
        show={isShowModalBlog}
        actionModal={actionModal}
        dataModal={dataModal}
        onHide={handleHideModalBlog}
      />
      <ModalDelete
        show={isShowModalDelete}
        dataModalDelete={dataModalDelete}
        onHide={handleHideModalDelete}
      />
    </div>
  );
};

export default ProductionArea;

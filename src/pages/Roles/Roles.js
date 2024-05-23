import React, { useEffect, useState } from "react";
import "./roles.scss";
import { Col, Form, Row } from "react-bootstrap";
import { fetchAllRole } from "../../services/roleService.js";
import ModalRole from "./ModalRole.js";
import ModalDelete from "./ModalDelete.js";
import { useStateContext } from "../../context/index.js";
import { useSelector } from "react-redux";
import ErrorConnectWallet from "../../components/Error/ErrorConnectWallet.js";
import Loading from "../../components/Loading/Loading.js";
const Roles = () => {
  const { address } = useStateContext();
  const walletAddress = useSelector(
    (state) => state.account.userInfor.walletAddress
  );
  const [loading, setLoading] = useState(true);
  // Data Role
  const [listRoles, setListRoles] = useState([]);
  // Modal Role
  const [isShowModalRole, setIsShowModalRole] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [actionModal, setActionModal] = useState("CREATE");

  // Modal Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState([]);

  const handleGetAllRoles = async () => {
    const res = await fetchAllRole();
    if (res && res.EC === 0) {
      setListRoles(res.DT);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllRoles();
  }, []);

  const handleHideModalRole = async () => {
    setIsShowModalRole(!isShowModalRole);
    await handleGetAllRoles();
  };
  const handleUpdateRole = (item) => {
    setActionModal("UPDATE");
    setIsShowModalRole(!isShowModalRole);
    setDataModal(item);
  };
  const handleCreateRole = () => {
    setActionModal("CREATE");
    setIsShowModalRole(!isShowModalRole);
  };

  const handleHideModalDelete = async () => {
    setIsShowModalDelete(!isShowModalDelete);
    await handleGetAllRoles();
  };
  const handleDeleteRole = (item) => {
    setIsShowModalDelete(!isShowModalDelete);
    setDataModalDelete(item);
  };
  if (walletAddress !== address) return <ErrorConnectWallet />;
  if (loading) return <Loading />;

  return (
    <div className="roles-container">
      <div className="table-container">
        <div className="table">
          <div className="add-role">
            <h3>Roles</h3>
            <button
              className="btn btn-secondary"
              onClick={() => handleCreateRole()}
            >
              <i class="fa fa-plus" aria-hidden="true"></i>New Role
            </button>
          </div>

          <div className="action-role">
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
                <th scope="col">Url</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listRoles &&
                listRoles.length > 0 &&
                listRoles.map((item, index) => {
                  return (
                    <tr key={`rows-${index}`}>
                      <th scope="row"> {item.id}</th>
                      <td>{item.url}</td>
                      <td>{item.description}</td>
                      <td className="actions">
                        <span
                          title="Edit"
                          className="edit"
                          onClick={() => handleUpdateRole(item)}
                        >
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </span>
                        <span
                          title="Delete"
                          className="delete"
                          onClick={() => handleDeleteRole(item)}
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
      <ModalRole
        show={isShowModalRole}
        actionModal={actionModal}
        dataModal={dataModal}
        onHide={handleHideModalRole}
      />
      <ModalDelete
        show={isShowModalDelete}
        dataModalDelete={dataModalDelete}
        onHide={handleHideModalDelete}
      />
    </div>
  );
};

export default Roles;

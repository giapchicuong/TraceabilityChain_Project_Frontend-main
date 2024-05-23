import React, { useEffect, useState } from "react";
import "./groups.scss";
import { Col, Form, Row } from "react-bootstrap";
import { fetchAllGroup } from "../../services/groupService";
import ModalGroup from "./ModalGroup";
import ModalDelete from "./ModalDelete.js";
import { useStateContext } from "../../context/index.js";
import { useSelector } from "react-redux";
import ErrorConnectWallet from "../../components/Error/ErrorConnectWallet.js";
import Loading from "../../components/Loading/Loading.js";
const Groups = () => {
  const { address } = useStateContext();
  const walletAddress = useSelector(
    (state) => state.account.userInfor.walletAddress
  );
  const [loading, setLoading] = useState(true);
  // Data Group
  const [listGroups, setListGroups] = useState([]);
  // Modal Group
  const [isShowModalGroup, setIsShowModalGroup] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [actionModal, setActionModal] = useState("CREATE");

  // Modal Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState([]);

  const handleGetAllGroups = async () => {
    const res = await fetchAllGroup();
    if (res && res.EC === 0) {
      setListGroups(res.DT);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllGroups();
  }, []);

  const handleHideModalGroup = async () => {
    setIsShowModalGroup(!isShowModalGroup);
    await handleGetAllGroups();
  };
  const handleUpdateGroup = (item) => {
    setActionModal("UPDATE");
    setIsShowModalGroup(!isShowModalGroup);
    setDataModal(item);
  };
  const handleCreateGroup = () => {
    setActionModal("CREATE");
    setIsShowModalGroup(!isShowModalGroup);
  };

  const handleHideModalDelete = async () => {
    setIsShowModalDelete(!isShowModalDelete);
    await handleGetAllGroups();
  };
  const handleDeleteGroup = (item) => {
    setIsShowModalDelete(!isShowModalDelete);
    setDataModalDelete(item);
  };
  if (walletAddress !== address) return <ErrorConnectWallet />;
  if (loading) return <Loading />;

  return (
    <div className="groups-container">
      <div className="table-container">
        <div className="table">
          <div className="add-group">
            <h3>Groups</h3>
            <button
              className="btn btn-secondary"
              onClick={() => handleCreateGroup()}
            >
              <i class="fa fa-plus" aria-hidden="true"></i>New Group
            </button>
          </div>

          <div className="action-group">
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
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listGroups &&
                listGroups.length > 0 &&
                listGroups.map((item, index) => {
                  return (
                    <tr key={`rows-${index}`}>
                      <th scope="row"> {item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td className="actions">
                        <span
                          title="Edit"
                          className="edit"
                          onClick={() => handleUpdateGroup(item)}
                        >
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </span>
                        <span
                          title="Delete"
                          className="delete"
                          onClick={() => handleDeleteGroup(item)}
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
      <ModalGroup
        show={isShowModalGroup}
        actionModal={actionModal}
        dataModal={dataModal}
        onHide={handleHideModalGroup}
      />
      <ModalDelete
        show={isShowModalDelete}
        dataModalDelete={dataModalDelete}
        onHide={handleHideModalDelete}
      />
    </div>
  );
};

export default Groups;

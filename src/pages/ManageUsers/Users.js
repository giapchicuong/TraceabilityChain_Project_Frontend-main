import React, { useEffect, useState } from "react";
import "./users.scss";
import { Col, Form, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { fetchAllUser } from "../../services/userSevices";
import ModalUser from "./ModalUser";
import { useSelector } from "react-redux";
import ModalDelete from "./ModalDelete";
import { useStateContext } from "../../context";
import ConnectWallet from "../../components/Error/ErrorConnectWallet";
import Loading from "../../components/Loading/Loading";
const Users = () => {
  const { address } = useStateContext();
  const walletAddress = useSelector(
    (state) => state.account.userInfor.walletAddress
  );
  // Page
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  // Data User
  const [listUsers, setListUsers] = useState([]);
  // Modal User
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [actionModal, setActionModal] = useState("CREATE");

  // Modal Delete
  const [isShowModaDelete, setIsShowModalDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState([]);

  const handleGetAllUser = async () => {
    const res = await fetchAllUser(currentPage, currentLimit);
    if (res && res.EC === 0) {
      setListUsers(res.DT.users);
      setTotalPages(res.DT.totalPages);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllUser();
  }, [currentPage]);

  // Pagination Button
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const handleHideModalUser = async () => {
    setIsShowModalUser(!isShowModalUser);
    await handleGetAllUser();
  };
  const handleUpdateUser = (item) => {
    setActionModal("UPDATE");
    setIsShowModalUser(!isShowModalUser);
    setDataModal(item);
  };
  const handleCreateUser = () => {
    setActionModal("CREATE");
    setIsShowModalUser(!isShowModalUser);
  };

  const handleHideModalDelete = async () => {
    setIsShowModalDelete(!isShowModaDelete);
    await handleGetAllUser();
  };
  const handleDeleteUser = (item) => {
    setIsShowModalDelete(!isShowModaDelete);
    setDataModalDelete(item);
  };
  if (walletAddress !== address) return <ConnectWallet />;
  if (loading) return <Loading />;
  return (
    <div className="users-container">
      <div className="table-container">
        <div className="table">
          <div className="add-user">
            <h3>Users</h3>
            <button
              className="btn btn-secondary"
              onClick={() => handleCreateUser()}
            >
              <i class="fa fa-plus" aria-hidden="true"></i>New User
            </button>
          </div>

          <div className="action-user">
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
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Sex</th>
                <th scope="col">Group</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listUsers &&
                listUsers.length > 0 &&
                listUsers.map((item, index) => {
                  return (
                    <tr key={`rows-${index}`}>
                      {/* <th scope="row">
                        {" "}
                        {(currentPage - 1) * currentLimit + index + 1}
                      </th> */}
                      <th scope="row"> {item.id}</th>
                      <td>{item.email}</td>
                      <td>{item.username}</td>
                      <td>{item.address}</td>
                      <td>{item.phone}</td>
                      <td>
                        {item.sex === "0"
                          ? "Male"
                          : item.sex === "1"
                          ? "Female"
                          : item.sex === "3"
                          ? "Other"
                          : ""}
                      </td>
                      <td>{item.Group ? item.Group.name : ""}</td>
                      <td className="actions">
                        <span
                          title="Edit"
                          className="edit"
                          onClick={() => handleUpdateUser(item)}
                        >
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </span>
                        <span
                          title="Delete"
                          className="delete"
                          onClick={() => handleDeleteUser(item)}
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
      <div className="paginate">
        {totalPages > 0 && (
          <ReactPaginate
            nextLabel=">>>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={3}
            pageCount={totalPages}
            previousLabel="<<<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        )}
      </div>
      <ModalUser
        show={isShowModalUser}
        actionModal={actionModal}
        dataModal={dataModal}
        onHide={handleHideModalUser}
      />
      <ModalDelete
        show={isShowModaDelete}
        dataModalDelete={dataModalDelete}
        onHide={handleHideModalDelete}
      />
    </div>
  );
};

export default Users;

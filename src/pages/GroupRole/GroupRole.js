import React, { useEffect, useState } from "react";
import "./groupRole.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import {
  assignRoleToGroup,
  fetchAllRole,
  fetchRoleByGroup,
} from "../../services/roleService";
import { fetchAllGroup } from "../../services/groupService";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/index.js";
import { useSelector } from "react-redux";
import ErrorConnectWallet from "../../components/Error/ErrorConnectWallet.js";
import Loading from "../../components/Loading/Loading.js";
const GroupRole = () => {
  const { address } = useStateContext();
  const walletAddress = useSelector(
    (state) => state.account.userInfor.walletAddress
  );
  const [assignRoleByGroup, setAssignRoleByGroup] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [listGroups, setListGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [loading, setLoading] = useState(true);

  const handleGetAllGroup = async () => {
    const res = await fetchAllGroup();
    if (res && res.EC === 0) {
      setListGroups(res.DT);
      setLoading(false);
    } else {
      toast.error(res.EM);
    }
  };

  const handleFetchAllRole = async () => {
    const res = await fetchAllRole();
    if (res && res.EC === 0) {
      setListRoles(res.DT);
    } else {
      toast.error(res.EM);
    }
  };
  const buildDataRolesByGroup = (groupRoles, allRoles) => {
    return allRoles.map((role) => ({
      ...role,
      isAssigned: groupRoles.some((item) => item.url === role.url),
    }));
  };

  const handleOnChange = async (value) => {
    setSelectedGroup(value);
    if (value) {
      const res = await fetchRoleByGroup(value);
      if (res && res.EC === 0) {
        let result = buildDataRolesByGroup(res.DT.Roles, listRoles);
        setAssignRoleByGroup(result);
      } else {
        toast.error(res.EM);
      }
    }
  };
  const handleSelectRole = (value) => {
    setAssignRoleByGroup((roles) =>
      roles.map((role) =>
        +role.id === +value ? { ...role, isAssigned: !role.isAssigned } : role
      )
    );
  };
  const buildDataToSave = () => ({
    groupId: selectedGroup,
    groupRoles: assignRoleByGroup
      .filter((item) => item.isAssigned)
      .map((item) => ({ groupId: +selectedGroup, roleId: +item.id })),
  });

  const handleSave = async () => {
    const data = buildDataToSave();
    const res = await assignRoleToGroup(data);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    handleGetAllGroup();
    handleFetchAllRole();
  }, []);
  if (walletAddress !== address) return <ErrorConnectWallet />;
  if (loading) return <Loading />;

  return (
    <div className="groupRole-container">
      <div className="table-container">
        <div className="table">
          <div className="title-groupRole">
            <h3>Role of groups</h3>{" "}
            <button className="btn btn-primary" onClick={() => handleSave()}>
              <i class="fa fa-floppy-o" aria-hidden="true"></i>Save
            </button>
          </div>
          <div className="action-groupRole">
            <Tabs
              defaultActiveKey="profile"
              id="justify-tab-example"
              className="mb-3"
              justify
              color="primary"
              activeKey={selectedGroup}
              onSelect={(id) => handleOnChange(id)}
            >
              {listGroups &&
                listGroups.length > 0 &&
                listGroups.map((item, index) => {
                  return (
                    <Tab
                      eventKey={item.id}
                      title={item.name}
                      key={`group-${index}`}
                    >
                      <ListGroup as="ol" numbered>
                        {assignRoleByGroup &&
                          assignRoleByGroup.length > 0 &&
                          assignRoleByGroup.map((item, index) => {
                            return (
                              <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                                label="disabled switch"
                                key={`role-${index}`}
                                onClick={() => handleSelectRole(item.id)}
                              >
                                <div className="ms-2 me-auto">
                                  <div className="fw-bold">{item.url}</div>
                                  {item.description}
                                </div>
                                <Form>
                                  <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    checked={item.isAssigned}
                                  />
                                </Form>
                              </ListGroup.Item>
                            );
                          })}
                      </ListGroup>
                    </Tab>
                  );
                })}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupRole;

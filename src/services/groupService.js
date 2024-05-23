import axios from "../setup/axios";

//GROUPS
const fetchAllGroup = () => {
  return axios.get("/group/read");
};
const createNewGroup = (groupData) => {
  return axios.post("/group/create", { ...groupData });
};
const updateGroup = (groupData) => {
  return axios.put("/group/update", { ...groupData });
};
const deleteGroup = (group) => {
  return axios.delete("/group/delete", { data: { id: group.id } });
};
export { fetchAllGroup, createNewGroup, updateGroup, deleteGroup };

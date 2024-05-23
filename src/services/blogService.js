import axios from "../setup/axios";

//BLOGS
const fetchAllBlog = () => {
  return axios.get("/blog/read");
};
const fetchBlogById = (id) => {
  return axios.get(`/blog/read?id=${id} `);
};
const createNewBlog = (blogData) => {
  return axios.post("/blog/create", { ...blogData });
};
const updateBlog = (blogData) => {
  return axios.put("/blog/update", { ...blogData });
};
const deleteBlog = (blog) => {
  return axios.delete("/blog/delete", { data: { id: blog.id } });
};

export { fetchAllBlog, fetchBlogById, createNewBlog, updateBlog, deleteBlog };

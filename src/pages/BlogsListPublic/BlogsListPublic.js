import React, { useEffect, useState } from "react";
import "./blogListPublic.scss";
import Card from "react-bootstrap/Card";
import NavbarPublic from "../../components/NavbarPublic/NavbarPublic";
import { fetchAllBlog } from "../../services/blogService";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
const BlogsListPublic = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleGetAllBlog = async () => {
    try {
      const res = await fetchAllBlog();
      if (res && res.EC === 0) {
        setBlogs(res.DT);
      } else {
        setError("Failed to fetch the blog data.");
      }
    } catch (error) {
      setError("An error occurred while fetching the blog data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllBlog();
  }, []);
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
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Error />
      </div>
    );
  }
  return (
    <div>
      <NavbarPublic />
      <div className="product container">
        <Row xs={1} md={4} className="">
          {blogs &&
            blogs.length > 0 &&
            blogs.map((item, index) => {
              return (
                <Col className="" style={{ padding: "10px 0" }}>
                  <NavLink to={`/public/blog/${item.id}`}>
                    <Card style={{ width: "18rem" }} key={`rows-${index}`}>
                      <Card.Img
                        variant="top"
                        src={item.image}
                        style={{ aspectRatio: "16/9" }}
                      />
                      <Card.Body>
                        <Card.Title
                          class="d-inline-block text-truncate"
                          style={{ maxWidth: "250px" }}
                        >
                          {item.name}
                        </Card.Title>
                        <Card.Text>
                          {item.updatedAt
                            ? formatVietnamTime(item.updatedAt)
                            : "Unknown date"}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </NavLink>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
};

export default BlogsListPublic;

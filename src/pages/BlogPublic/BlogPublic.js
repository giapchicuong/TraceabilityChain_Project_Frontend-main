import React, { useEffect, useState } from "react";
import "./blogPublic.scss";
import { Card, Button } from "react-bootstrap";
import NavbarPublic from "../../components/NavbarPublic/NavbarPublic";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { fetchBlogById } from "../../services/blogService";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
const BlogPublic = () => {
  const blogId = useParams();

  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleGetBlogById = async () => {
    try {
      const res = await fetchBlogById(blogId.id);
      if (res && res.EC === 0) {
        setBlog(res.DT);
      } else {
        setError("Failed to fetch the blog data.");
      }
    } catch (err) {
      setError("An error occurred while fetching the blog data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetBlogById();
  }, [blogId]);

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
  if (loading) return <Loading />;

  if (error) return <Error />;
  return (
    <div className="blog-page">
      <NavbarPublic />
      <div className="blog-container">
        <Card className="blog-card">
          <Card.Img variant="top" src={blog.image} alt={blog.name} />
          <Card.Body>
            <Card.Title className="blog-title">{blog.name}</Card.Title>
            <Card.Text className="blog-description">
              {blog.description}
            </Card.Text>

            <Card.Text className="blog-date">
              By Admin on{" "}
              {blog.updatedAt
                ? formatVietnamTime(blog.updatedAt)
                : "Unknown date"}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
//   return (
//     <div
//       style={{
//         display: "flex",
//         minHeight: "100vh",
//         justifyContent: "space-around",
//         flexDirection: "column",
//         gap: "30px",
//       }}
//     >
//       <NavbarPublic />
//       <div
//         className="container"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <Card
//           className=""
//           style={{
//             width: "70%",
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           <Card.Img
//             variant="top"
//             src={blog.image}
//             style={{
//               width: "100%",
//               display: "flex",
//               justifyContent: "center",
//               objectFit: "contain",
//             }}
//           />
//           <Card.Body>
//             <Card.Title>{blog.name}</Card.Title>
//             <Card.Text>{blog.description}</Card.Text>
//             <Card.Text className="text-muted">
//               By Admin on{" "}
//               {blog.updatedAt
//                 ? formatVietnamTime(blog.updatedAt)
//                 : "Unknown date"}
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// };

export default BlogPublic;

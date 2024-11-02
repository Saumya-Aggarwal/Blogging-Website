import React from "react";
import uploadFile from "../../appwrite/upload";
import { Link } from "react-router-dom";
function PostCard({post}) {
  return (
    <div className="card text-center " >
      <img
        src={uploadFile.filePreview(post.featuredImage)}
        className="card-img-top"
        alt={post.title}
      />
      <div className="card-body">
        <h5 className="card-title text-center">{post.title}</h5>
        <hr />
        <Link to={`/post/${post.$id}`} className="btn btn-primary">
          View Post
        </Link>
      </div>
    </div>
  );
}

export default PostCard;

import React from "react";
import uploadFile from "../appwrite/upload";
import { Link } from "react-router-dom";
function PostCard({ $id, title, featuredImage }) {
  return (
    <div className="card" style="width: 18rem;">
      <img
        src={uploadFile.filePreview(featuredImage)}
        className="card-img-top"
        alt={title}
      />
      <div className="card-body">
        <h5 className="card-title text-center">{title}</h5>
        <hr className=" text-center w-50"/>
        <Link to={`/post/${$id}`} className="btn btn-primary">
          View Post
        </Link>
      </div>
    </div>
  );
}

export default PostCard;

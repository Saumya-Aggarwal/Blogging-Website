import React from "react";
import { Link } from "react-router-dom";
import uploadFile from "../../appwrite/upload";
function MyPostCard({post, deletePost}) {
  
    return (
    <div class="card shadow-sm" bis_skin_checked="1">
      <img
        src={uploadFile.filePreview(post.featuredImage)}
        className="card-img-top"
        alt={post.title}
      />
      <div class="card-body" bis_skin_checked="1">
        <h5 className="card-title text-center">{post.title}</h5>
        <hr className="  w-100" />
        <div
          class="d-flex justify-content-between align-items-center"
          bis_skin_checked="1"
        >
          <div class="btn-group" bis_skin_checked="1">
            <Link to={`/post/${post.$id}`} type="button" class="btn btn-sm btn-outline-warning">
              View
            </Link>
            <Link to = {`/edit-post/${post.$id}`}type="button" class="btn btn-sm btn-outline-warning">
              Edit
            </Link>
          </div>
          <button type="button" class="btn btn-sm btn-danger me-4" onClick={() => deletePost(post.$id)}>
              Delete
            </button>
          <small class="text-body-secondary ">{post.status.toUpperCase()}</small>
        </div>
      </div>
    </div>
  );
}

export default MyPostCard;

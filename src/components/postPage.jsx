import React from "react";
import uploadFile from "../appwrite/upload";
function BlogPost({ post }) {
  return (
    <div class="card mb-4 w-75 mx-auto">
      <img src={`${uploadFile.filePreview(post.featuredImage)}`} class="card-img-top" alt={`${post.heading}`} />
      <div class="card-body">
        <h2 class="card-title">${post.title}</h2>
        <p class="card-text">${post.content}</p>
      </div>
    </div>
  );
}

export default BlogPost;

import React from "react";
import uploadFile from "../appwrite/upload";
import parse from 'html-react-parser';

function BlogPost({ post }) {
  return (
    <div class="card mb-4 w-75 mx-auto">
      <img src={`${uploadFile.filePreview(post.featuredImage)}`} class="card-img-top" alt={`${post.heading}`} />
      <div class="card-body">
        <h2 class="card-title mb-5">{post.title}</h2>
        <p class="card-text">{parse(post.content)}</p>
      </div>
    </div>
  );
}

export default BlogPost;

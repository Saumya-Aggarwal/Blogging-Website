import React, { useEffect, useState } from "react";
import { PostForm } from "../components/index";
import dataService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
function EditPostPage() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      dataService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    }else {
        navigate ("/")
    }
  }, [slug, navigate]);
  return <div className="container"> <PostForm post = {post}></PostForm></div>;
}

export default EditPostPage;

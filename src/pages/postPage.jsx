import React, { useEffect, useState } from "react";
import dataService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { BlogPost } from "../components";
function PostPage() {
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
    return <div className="container"> <BlogPost post = {post}></BlogPost></div>;
}

export default PostPage
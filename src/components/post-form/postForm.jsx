import React, { useCallback, useEffect } from "react";
import { Select, Input, RTE } from "../index";
import uploadFile from "../../appwrite/upload";
import dataService from "../../appwrite/config";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Reset form values when the post prop changes
  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        slug: post.$id || "",
        content: post.content || "",
        status: post.status || "active",
      });
    }
  }, [post, reset]);

  async function submit(data) {
    let newFeaturedImage = null;

    // Handle image upload if a new image is selected
    if (data.image && data.image.length > 0) {
      console.log("Uploading new image...");
      newFeaturedImage = await uploadFile.uploadImg(data.image[0]);

      // If new image upload succeeds and there’s an old image, delete the old image
      if (newFeaturedImage && post?.featuredImage) {
        console.log("Deleting old image...");
        await uploadFile.deleteImg(post.featuredImage);
      }
    }

    if (post) {
      // Update existing post with new image (if any) or keep the old one
      const updatedPost = await dataService.updatePost(post.$id, {
        ...data,
        featuredImage: newFeaturedImage ? newFeaturedImage.$id : post.featuredImage,
      });
      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`);
      }
    } else {
      // Create new post with uploaded image
      if (newFeaturedImage) {
        data.featuredImage = newFeaturedImage.$id;
      }
      const newPost = await dataService.createPost({
        ...data,
        userId: userData.$id,
      });
      if (newPost) {
        console.log(newPost);
        navigate(`/post/${newPost.$id}`);
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/ /g, "-");
    }
    return "";
  }, []);

  // Watch title input and update slug automatically
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-uppercase text-center mb-4 text-decoration-underline ">
              {post ? "Update Post" : "Create Post"}
            </h2>
            <form onSubmit={handleSubmit(submit)} className="w-75 m-auto">
              <Input
                type="text"
                name="title"
                placeholder="Title"
                label="Title :"
                className="mb-3 "
                {...register("title", { required: true })}
              />
              <div className="form-group">
                <Input
                  name="slug"
                  placeholder="Slug"
                  label="Slug :"
                  className="mb-3"
                  {...register("slug", { required: true })}
                  readOnly
                />
              </div>
              <div className="form-group d-flex ">
                <Input
                  name="image"
                  type="file"
                  placeholder="Select an image"
                  label="Image :"
                  className="mb-3 w-75"
                  {...register("image")}
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                />
                <Select
                  options={["Active", "Inactive"]}
                  label="Status : "
                  className="mt-2 w-75 "
                  {...register("status", { required: true })}
                />
              </div>
              {post && post.featuredImage && (
                <div className="w-100 mb-4">
                  <img
                    src={uploadFile.filePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-3"
                  />
                </div>
              )}
              <div className="form-group">
                <RTE
                  control={control}
                  label="Content"
                  name="content"
                  defaultValue={getValues("content")}
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  value="Publish"
                  className="btn btn-primary form-control my-3"
                >
                  {post ? "Update Post" : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostForm;

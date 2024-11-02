import React, { useCallback, useEffect } from "react";
import { Select, Input, RTE } from "../index";
import uploadFile from "../../appwrite/upload";
import dataService from "../../appwrite/config";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => {
    return state.auth.userData;
  });
  async function submit(data) {
    if (post) {
      const newFeaturedImage = data.image[0]
        ? uploadFile.uploadImg(data.image[0])
        : null;
      if (newFeaturedImage) {
        uploadFile.deleteImg(post.featuredImage);
      }
      const updatedPost = await dataService.updatePost(post.$id, {
        ...data,
        featuredImage: newFeaturedImage
          ? newFeaturedImage.$id
          : post.featuredImage,
      });
      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`);
      }
    } else {
      const ImageResponse = data.image[0]
        ? await uploadFile.uploadImg(data.image[0])
        : null;
      if (ImageResponse) {
        data.featuredImage = ImageResponse.$id;
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
  }
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      const slug = value.trim().toLowerCase().replace(/ /g, "-");
      return slug;
    }
    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscription.unsubscribe(); // doing this since useEffect depends on watch so we dont the useEffect to run in an endless loop.
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
                  onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
              <div className="form-group d-flex ">
                <Input
                  name="image"
                  type="file"
                  placeholder="Select an image"
                  label="Image :"
                  className="mb-3 w-75"
                  {...register("image", { required: !post })}
                  accept=" image/png , image/jpg , image/jpeg, image/gif"
                />
                <Select
                  options={["Active", "Inactive"]}
                  label="Status : "
                  className="mt-2 w-75 "
                  {...register("status", {required : true})}
                />
              </div>
              {post && (
                <div className="w-100 mb-4">
                  <img
                    src={uploadFile.filePreview(post.featuredImage)}
                    alt={post.title}
                    className=" rounded-3"
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
                  className="btn btn-primary form-control mt-3"
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

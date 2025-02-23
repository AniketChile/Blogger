import React from "react";
import { Button, Input, Select, RTE } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useEffect } from "react";
export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    let file = null;
    
    if (data.image && data.image[0]) {
        file = await appwriteService.uploadFile(data.image[0]);
    }

    if (!file || !file.$id) {
        alert("Error: Featured image is required!");
        return;
    }

    data.featuredImages = file.$id;  // ✅ Assigning the correct field name

    const dbPost = await appwriteService.createPost({
        ...data,
        userID: userData.$id,
    });

    if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
    }
};

const slugTransform = useCallback((value) => {
  if (!value) return "";
  
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-") // ✅ Keeps only valid slug characters
    .replace(/-+/g, "-") // ✅ Removes duplicate hyphens
    .slice(0, 36); // ✅ Ensures max length is 36
}, []);


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
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Feature Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", {
              required: !post ? "Feature image is required" : false,
            })}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                console.log("Selected file:", file); // Debugging log
              }
            }}
          />

          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}

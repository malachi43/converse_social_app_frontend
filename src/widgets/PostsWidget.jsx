import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  
  //Get all posts
  const getPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    return data;
  };

  //Get single user post
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    let cancel = false;
    getUserPosts().then((data) => {
      if (isProfile) {
        if (!cancel) {
          dispatch(setPosts({ posts: data }));
        }
      } else {
       getPosts().then(data => {
        if (!cancel) {
          dispatch(setPosts({ posts: data }));
        }
       })
       
      }
    });

    return () => {
      cancel = true;
    };
  },[]);

  console.log(posts);
  if (Object.keys(posts).length <= 0) return null;

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          picturePath,
          userPicturePath,
          likes,
          comments,
          location,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            location={location}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;

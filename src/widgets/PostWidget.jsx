import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
  location,
}) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  //Check if current user has liked the post
  const isLiked = Boolean(likes[loggedInUserId])
  const likeCount = Object.keys(likes).length;
  
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
  const baseUrl = `http://localhost:3001`

      const response = await fetch(
        `${baseUrl}/posts/${postId}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );

      const updatePost = await response.json();
      dispatch(setPost({ post: updatePost }));
    } catch (error) {
      console.log(`Error: `, error.message);
    }
  };

  return (
    <>
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ margin: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}

        {/* LIKE SECTION */}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>

            {/* COMMENT SECTION */}
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsCommentOpen(!isCommentOpen)}>
                <ChatBubbleOutlineOutlined />
                <Typography>{comments.length}</Typography>
              </IconButton>
            </FlexBetween>
          </FlexBetween>
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isCommentOpen && (
          <Box mt="0.5rem">
            {comments.map((comment, idx) => (
              <Box key={`${name}-${idx}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        <Divider />
      </WidgetWrapper>
    </>
  );
};

export default PostWidget;

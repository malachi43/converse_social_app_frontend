import { Box, useMediaQuery } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "widgets/UserWidget";
import PostsWidget from "widgets/PostsWidget";
import MyPostWidget from "widgets/MyPostWidget";
import AdvertWidget from "widgets/AdvertWidget";
import FriendListWidget from "widgets/FriendListWidget";
import { useEffect } from "react";
import { setPosts } from "state";

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   let cancel = false;
  //   if (!cancel) {
  //     dispatch(setPosts({ posts }));
  //   }

  //   return () => {
  //     cancel = true;
  //   };
  // });

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreen ? (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box margin="2rem 0">
              <FriendListWidget userId={_id} />
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default HomePage;

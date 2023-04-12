import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useTheme } from "@emotion/react";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  //Check if the friend is a friend to the user.
  const isFriend = friends.find((friend) => {
    if(friend){
      return friend._id === friendId
    }
  });

  const patchFriend = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${_id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(`response: `, data);

      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.log(`Error: `, error.message);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            //refreshes the page after navigating to the specified friend-profile
            navigate(0);
          }}
        >
          <Typography
            color={main}
            fontWeight="500"
            variant="h5"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={patchFriend}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;

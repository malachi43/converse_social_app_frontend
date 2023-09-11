import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  const baseUrl = `http://localhost:3001`;

  return (
    <Box width={size} height={size}>
      <img
        src={`${baseUrl}/assets/${image}`}
        alt="user"
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
      />
    </Box>
  );
};

export default UserImage;

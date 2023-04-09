import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizonOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import {useState} from "react"
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "state";


const MyPostWidget = ({picturePath})=>{
   const dispatch = useDispatch()
   CONST [isImage,setIsImage] = useState(false)
   
}
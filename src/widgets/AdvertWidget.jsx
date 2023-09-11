import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {

const {palette} = useTheme()
const dark = palette.neutral.dark
const main =palette.neutral.main
const medium = palette.neutral.medium

 return ( <WidgetWrapper>
    <FlexBetween>
      <Typography color={dark} variant="h5" fontWeight="500">
        Sponsored
      </Typography>
      <Typography color={medium} variant="h5" fontWeight="500">
        Create Ad
      </Typography>
    </FlexBetween>
    <img
      width="100%"
      height="auto"
      src=" http://localhost:3001/assets/info4.jpeg"
      style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      alt="advert"
    />
    <FlexBetween>
      <Typography color={main}>GlamourCosmetics.</Typography>
    </FlexBetween>
    <Typography color={medium}>
        {"GlamourCosmetics.com".toLocaleLowerCase()}
      </Typography>
    <Typography color={medium} margin="0.5rem 0">
      Your pathway to epidermal breakthrough. Exfoliates your skin to give the
      real skin.
    </Typography>
  </WidgetWrapper>);
};


export default AdvertWidget

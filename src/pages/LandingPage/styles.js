// @flow
import { StyleSheet } from "aphrodite";
import { Colors, Fonts, Images } from "../../theme";

export default StyleSheet.create({
  mainCont: {
    margin: "40px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  stateHoverInfo: {
    // width: 174,
    background: `${Colors.text.primary}`,
    boxShadow: "0px 17px 19px rgba(0, 0, 0, 0.24)",
    borderRadius: 9,
    padding: "16px 11px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "flex-start",
    lineHeight: 1.5,
    position: "relative",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 18,
    color: `${Colors.background.primary}`,

    // "::before": {
    //   content: "''",
    //   position: "absolute",
    //   width: 37,
    //   height: 37,
    //   backgroundImage: `url(${Images.polygon_icon})`,
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "contain",
    //   bottom: -20,
    //   left: 0,
    //   right: 0,
    //   margin: "auto",
    // },
  },

  workerCount: {
    fontFamily: `${Fonts.type.montserrat}`,
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 20,
    color: `${Colors.black}`,
  },

  workerHoverInfo: {
    maxWidth: 303,
    width: "100%",
    background: `${Colors.text.primary}`,
    boxShadow: "0px 17px 19px rgba(0, 0, 0, 0.24)",
    borderRadius: 9,
    padding: "20px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
    lineHeight: 1.5,
    position: "relative",
    "@media (max-width: 980px)": {
      padding: 10,
    },

    // "::before": {
    //   content: "''",
    //   position: "absolute",
    //   width: 37,
    //   height: 37,
    //   backgroundImage: `url(${Images.polygon_icon})`,
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "contain",
    //   bottom: -20,
    //   left: 0,
    //   right: 0,
    //   margin: "auto",
    // },
  },

  profileImgStyle: {
    width: 88,
    height: 88,
    objectFit: "cover",
    borderRadius: "100%",
    boxShadow: "1px 1px 4px 3px #171c234a",
    "@media (max-width: 980px)": {
      width: 40,
      height: 40,
    },
  },
  defaultProfileImgStyle: {
    width: 88,
    height: 88,
    objectFit: "cover",
    borderRadius: "100%",
    boxShadow: "1px 1px 4px 3px #171c234a",
    "@media (max-width: 980px)": {
      width: 40,
      height: 40,
    },
  },
  workerName: {
    fontFamily: `${Fonts.type.montserrat}`,
    fontWeight: 600,
    fontSize: 20,
    lineHeight: "normal",
    textAlign: "center",
    color: `${Colors.black}`,
    textTransform: "capitalize",
    marginTop: 9,
    "@media (max-width: 980px)": {
      fontSize: 16,
    },
  },

  socialWork: {
    fontFamily: `${Fonts.type.montserrat}`,
    fontWeight: 600,
    fontSize: 16,
    lineHeight: "normal",
    textAlign: "center",
    color: `${Colors.black}`,
    textTransform: "capitalize",
    marginTop: 9,
    "@media (max-width: 980px)": {
      fontSize: 12,
    },
  },

  socialWorkText: {
    fontWeight: 400,
  },

  workerCityState: {
    fontFamily: `${Fonts.type.montserrat}`,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "normal",
    textAlign: "center",
    color: `${Colors.black}`,
    marginTop: 9,
    "@media (max-width: 980px)": {
      fontSize: 12,
    },
  },
});

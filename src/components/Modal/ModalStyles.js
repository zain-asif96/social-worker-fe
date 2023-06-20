// @flow
import { StyleSheet } from "aphrodite";
import { Colors, Fonts } from "../../theme";

export default StyleSheet.create({
  modalWrap: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "71px 20px 0 0",
  },

  formOpenBtn: {
    background: `${Colors.background.secondary}`,
    height: 57,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: Fonts.type.montserrat,
    fontWeight: 600,
    fontSize: 18,
    lineHeight: "normal",
    color: `${Colors.text.primary}`,
    textTransform: "capitalize",
    "@media (max-width: 767px)": {
      fontSize: 15,
    },
  },

  closeIcon: {
    position: "absolute",
    width: 24,
    height: 24,
    right: 26,
    top: 24,
    cursor: "pointer",
    "@media (max-width: 767px)": {
      top: 15,
      right: 15,
    },
  },

  imgLabelText: {
    color: `${Colors.text.labelText}`,
    fontFamily: `${Fonts.type.montserrat}`,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.5,
    letterSpacing: 0.3,
    textAlign: "center",
    opacity: 0.5,
    marginBottom: 10,
    position: "relative",
    width: "100%",
    "@media (max-width: 767px)": {
      fontSize: 15,
    },
  },

  labelText: {
    color: `${Colors.text.labelText}`,
    fontFamily: `${Fonts.type.montserrat}`,
    fontWeight: 500,
    fontSize: 18,
    lineHeight: 1.5,
    letterSpacing: 0.3,
    opacity: 0.5,
    marginBottom: 10,
    position: "relative",
    width: "100%",
    "@media (max-width: 767px)": {
      fontSize: 15,
    },
  },

  tooltipIconWrap: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
  },

  submitBtn: {
    background: "linear-gradient(180.75deg, #050C44 -17.54%, #061160 99.36%)",
    height: 57,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: Fonts.type.montserrat,
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: 0.3,
    lineHeight: "normal",
    color: `${Colors.white}`,
    textTransform: "capitalize",
    width: "100%",
    marginTop: 37,
  },
});

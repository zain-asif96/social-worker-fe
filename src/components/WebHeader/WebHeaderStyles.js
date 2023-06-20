// @flow
import { StyleSheet } from "aphrodite";
import { AppStyles, Colors, Fonts } from "../../theme";

export default StyleSheet.create({
  headerContainer: {
    background: `${Colors.background.primary}`,
    minHeight: 37,
    position: "absolute",
    top: 0,
    width: "100%",
    padding: "8px 0 7px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  headText: {
    color: `${Colors.text.primary}`,
    fontFamily: `${Fonts.type.montserrat}`,
    fontWeight: 600,
    fontSize: 18,
    marginBottom: 0,
  },
});

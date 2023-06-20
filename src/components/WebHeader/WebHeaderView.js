// @flow
import React, { useState } from "react";
import { css } from "aphrodite";
import styles from "./WebHeaderStyles";
import { GET_HEADER_TEXT } from "../../graphql/queries/header";
import { useQuery } from "@apollo/client";
import _ from "lodash";

export default function WebHeaderView(props) {
  const [headerText, setHeaderText] = useState(() => "");

  const { data } = useQuery(GET_HEADER_TEXT, {
    onCompleted: (data) => {
      setHeaderText(data?.headerText?.data?.attributes?.Title);
    },
  });

  return (
    <div className={`${css(styles.headerContainer)}`}>
      <p className={`${css(styles.headText)}`}>
        {!_.isUndefined(headerText) ? headerText : "#PutSocialWorkOnTheMap"}
      </p>
    </div>
  );
}

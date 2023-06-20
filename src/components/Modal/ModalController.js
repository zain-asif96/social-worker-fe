// @flow
import React from "react";
import PropTypes from "prop-types";

import ModalView from "./ModalView";

export default class ModalController extends React.Component {
  static propTypes = {
    pushWorkerList: PropTypes.func,
  };

  static defaultProps = {
    pushWorkerList: () => {
      console.log("Method Not Available");
    },
  };

  render() {
    return <ModalView {...this.props} />;
  }
}

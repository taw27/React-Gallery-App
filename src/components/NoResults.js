import React from "react";
import PropTypes from "prop-types";

const NoResults = ({errorTitle, errorMessage}) => (
  <li className="not-found">
    <h3>{errorTitle}</h3>
    <p>{errorMessage}</p>
  </li>
);

NoResults.propTypes = {
  errorTitle: PropTypes.string,
  errorMessage: PropTypes.string
}

export default NoResults;

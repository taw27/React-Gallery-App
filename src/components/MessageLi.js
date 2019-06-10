import React from "react";
import PropTypes from "prop-types";

const MessageLi = ({messageTitle, messageText}) => (
  <li className="message">
    <h3>{messageTitle}</h3>
    <p>{messageText}</p>
  </li>
);

MessageLi.propTypes = {
  messageTitle: PropTypes.string,
  messageText: PropTypes.string
}

export default MessageLi;

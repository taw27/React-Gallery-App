import React from "react";
import PropTypes from "prop-types";

/* 
Renders message based on props
 */
const MessageLi = ({ messageTitle, messageText }) => (
  <li className="message">
    <h3>{messageTitle}</h3>
    <p>{messageText}</p>
  </li>
);

// prop validations
MessageLi.propTypes = {
  messageTitle: PropTypes.string,
  messageText: PropTypes.string
};

export default MessageLi;

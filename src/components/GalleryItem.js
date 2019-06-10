import React from "react";
import Proptypes from "prop-types";

const GalleryItem = ({ farm, server, id, secret, title }) => {
  /* Renders an  in an li based on props */
  return (
    <li>
      <img
        src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}
        alt={title}
      />
    </li>
  );
};

// Props validations
GalleryItem.propTypes = {
  farm: Proptypes.number,
  server: Proptypes.string,
  id: Proptypes.string,
  secret: Proptypes.string,
  title: Proptypes.string
};

export default GalleryItem;

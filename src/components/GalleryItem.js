import React from "react-dom";
import Proptypes from "prop-types";

const GalleryItem = ({farm, server, key, secret}) =>{
    return(
        <li>
            <img src={`https://farm${farm}.staticflickr.com/${server}/${key}_${secret}.jpg`} alt="gallery-image" />
        </li>
    );
};

GalleryItem.propTypes = {
    farm: Proptypes.number,
    server: Proptypes.string,
    key: Proptypes.string,
    secret: Proptypes.string
}

export default GalleryItem;
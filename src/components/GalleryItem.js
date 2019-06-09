import React from "react-dom";
import Proptypes from "prop-types";

const GalleryItem = ({farm, server, id, secret}) =>{
    return(
        <li>
            <img src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`} alt="gallery-image" />
        </li>
    );
};

GalleryItem.propTypes = {
    farm: Proptypes.number,
    server: Proptypes.string,
    id: Proptypes.string,
    secret: Proptypes.secret
}

export default GalleryItem;
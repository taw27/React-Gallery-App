import React from "react";
import Proptypes from "prop-types";
import GalleryItem from "./GalleryItem";
import NoResults from "./NoResults";

const Gallery = ({ title, photos }) => {
  const isEmpty = !(photos.length > 0);
  return (
    <div className="photo-container">
      <h2> {isEmpty ? "" : title} </h2>
      <ul>
        {!isEmpty ? (
            photos.map(photo => (
            <GalleryItem
                farm={photo.farm}
                key={photo.id}
                server={photo.server}
                secret={photo.secret}
            />
            ))
        ) : (
            <NoResults />
        )}
      </ul>
    </div>
  );
};

Gallery.propTypes = {
  title: Proptypes.string,
  photos: Proptypes.array
};

export default Gallery;

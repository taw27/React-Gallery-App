import React from "react";
import Proptypes from "prop-types";
import GalleryItem from "./GalleryItem";
import MessageLi from "./MessageLi";

const Gallery = ({ photos, title }) => {
  const isEmpty = !(photos.length > 0);
  const errorMessage =
    "You search did not return any results. Please try a different query";
  const errorTitle = "No Results Found";
  return (
    <div className="photo-container">
      {/* Renders the GallerItems components for each photo in Phtos prop. If photos prop is empty renders No results mesage */}
      <h2> {isEmpty ? "" : title} </h2>
      <ul>
        {!isEmpty ? (
          photos.map(photo => (
            <GalleryItem
              farm={photo.farm}
              key={photo.id}
              id={photo.id}
              server={photo.server}
              secret={photo.secret}
              title={photo.title}
            />
          ))
        ) : (
          <MessageLi messageTitle={errorTitle} messageText={errorMessage} />
        )}
      </ul>
    </div>
  );
};

// prop validations
Gallery.propTypes = {
  title: Proptypes.string,
  photos: Proptypes.array
};

export default Gallery;

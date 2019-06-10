import React, { Component } from "react";
import Proptypes from "prop-types";
import GalleryItem from "./GalleryItem";
import MessageLi from "./MessageLi";
import queryString from "query-string";

class Gallery extends Component {
  render() {
    const { photos, title } = this.props;
    const isEmpty = !(photos.length > 0);
    const errorMessage = "You search did not return any results. Please try a different query" ;
    const errorTitle= "No Results Found";
    return (
      <div className="photo-container">
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
            <MessageLi messageTitle={errorTitle} messageText={errorMessage}/>
          )}
        </ul>
      </div>
    );
  }
}

Gallery.propTypes = {
  title: Proptypes.string,
  photos: Proptypes.array,
  location: Proptypes.object,
  fetchSearchImages: Proptypes.func
};

export default Gallery;

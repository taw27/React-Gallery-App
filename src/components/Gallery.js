import React, { Component } from "react";
import Proptypes from "prop-types";
import GalleryItem from "./GalleryItem";
import NoResults from "./NoResults";
import queryString from "query-string";

class Gallery extends Component {
  componentDidMount() {
    const { location, fetchSearchImages } = this.props;

    if (location.search) {
      const values = queryString.parse(this.props.location.search);
      fetchSearchImages(values.query);
    }
  }

  render() {
    const { photos, title } = this.props;
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
                id={photo.id}
                server={photo.server}
                secret={photo.secret}
                title={photo.title}
              />
            ))
          ) : (
            <NoResults />
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

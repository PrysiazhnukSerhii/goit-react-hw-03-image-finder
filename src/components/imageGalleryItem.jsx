import { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    let peintedPictures = this.props.arrayPictures.map(e => {
      return (
        <li className="imageGalleryItem" key={e.id}>
          <img
            className="imageGalleryItem-image"
            src={e.webformatURL}
            alt={e.tags}
            id={e.id}
          />
        </li>
      );
    });

    return peintedPictures;
  }
}

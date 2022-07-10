import { Component } from 'react';
import { ImageGalleryItem } from './imageGalleryItem';
import { ButtonMore } from './button';

export class ImageGallery extends Component {
  state = {
    arrayPictures: null,
    page: 1,
    error: null,
  };

  requestFetch = (name, page = 1) => {
    return fetch(
      `https://pixabay.com/api/?q=${name}&page=${page}&key=27562603-8a4226043483e253e97fc4251&image_type=photo&orientation=horizontal&per_page=12`
    ).then(respons => respons.json());
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.serchName !== this.props.serchName) {
      // fetch(
      //   `https://pixabay.com/api/?q=${this.props.serchName}&page=1&key=27562603-8a4226043483e253e97fc4251&image_type=photo&orientation=horizontal&per_page=12`
      // )
      //   .then(respons => respons.json())
      this.requestFetch(this.props.serchName).then(arrayPictures => {
        this.setState(() => ({
          arrayPictures: arrayPictures.hits,
          page: 1,
        }));
      });
    }
  }

  onClickMore = () => {
    this.requestFetch(this.props.serchName, this.state.page + 1).then(
      arrayPictures => {
        this.setState(prevState => {
          return {
            arrayPictures: [...prevState.arrayPictures, ...arrayPictures.hits],
            page: this.state.page + 1,
          };
        });
      }
    );
  };

  render() {
    console.log(this.state.arrayPictures);
    return (
      <>
        {this.state.error && <h2>this.state.error</h2>}
        {this.state.arrayPictures && (
          <ul className="imageGallery">
            <ImageGalleryItem arrayPictures={this.state.arrayPictures} />
          </ul>
        )}

        {this.state.arrayPictures && <ButtonMore onClick={this.onClickMore} />}
      </>
    );
  }
}

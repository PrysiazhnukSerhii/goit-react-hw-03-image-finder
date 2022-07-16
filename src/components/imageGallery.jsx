import { TailSpin } from 'react-loader-spinner';
import { Component } from 'react';
import { ImageGalleryItem } from './imageGalleryItem';
import { ButtonMore } from './button';
import { Modal } from './modal';
import { getImages } from '../services';

export class ImageGallery extends Component {
  state = {
    arrayPictures: null,
    page: 1,
    status: 'idle',
    error: null,
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { serchName } = this.props;
    const { page } = this.state;
    if (prevProps.serchName !== serchName) {
      this.setState({ status: 'pending', page: 1 });

      getImages(serchName, 1)
        .then(arrayPictures => {
          if (arrayPictures.hits.length < 1) {
            return Promise.reject(new Error(`Can't find: "${serchName}"`));
          }

          this.setState(() => ({
            arrayPictures: arrayPictures.hits,
            status: 'resolved',
          }));
        })
        .catch(error => {
          return this.setState(() => ({ error: error, status: 'rejected' }));
        });
    }

    if (prevState.page !== page) {
      getImages(serchName, page + 1).then(arrayPictures => {
        this.setState(prevState => {
          return {
            arrayPictures: [...prevState.arrayPictures, ...arrayPictures.hits],
          };
        });
      });
    }
  }

  render() {
    const { status, arrayPictures, error } = this.state;
    if (status === 'pending') {
      return <TailSpin />;
    }

    if (status === 'rejected') {
      return <h2>{error.message}</h2>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="imageGallery">
            <ImageGalleryItem arrayPictures={arrayPictures} />
          </ul>
          <ButtonMore onClick={this.loadMore} />
          <Modal picture={arrayPictures} />
        </>
      );
    }
  }
}

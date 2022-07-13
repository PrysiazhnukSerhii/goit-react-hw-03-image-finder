import { TailSpin } from 'react-loader-spinner';
import { Component } from 'react';
import { ImageGalleryItem } from './imageGalleryItem';
import { ButtonMore } from './button';
import { Modal } from './modal';

// "idle" - стоїть нічого не робить
// 'pending' -  очікується виконання
// 'resolved' - виконалось з результатом (добре)
// 'rejected' - відхиленно

export class ImageGallery extends Component {
  state = {
    arrayPictures: null,
    page: 1,
    status: 'idle',
    error: null,
    modal: null,
  };

  requestFetch = (name, page) => {
    return fetch(
      `https://pixabay.com/api/?q=${name}&page=${page}&key=27562603-8a4226043483e253e97fc4251&image_type=photo&orientation=horizontal&per_page=12`
    ).then(respons => respons.json());
  };

  resetModal = () => {
    this.setState({ modal: null });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { serchName } = this.props;
    const { page } = this.state;
    if (prevProps.serchName !== serchName) {
      this.setState({ status: 'pending', page: 1 });

      this.requestFetch(serchName, 1)
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
      this.requestFetch(serchName, page + 1).then(arrayPictures => {
        console.log(page);
        this.setState(prevState => {
          return {
            arrayPictures: [...prevState.arrayPictures, ...arrayPictures.hits],
          };
        });
      });
    }
  }

  componentDidMount() {
    window.addEventListener('click', e => {
      const { classList, id } = e.target;

      if (classList.contains('overlay')) {
        this.resetModal();
        return;
      }

      if (!classList.contains('imageGalleryItem-image')) {
        return;
      }

      let result = this.state.arrayPictures.filter(
        information => information.id === Number(id)
      );

      this.setState({ modal: result });
    });

    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.resetModal();
      }
    });
  }

  render() {
    const { status, arrayPictures, modal, error } = this.state;
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
          {modal && <Modal picture={modal} />}
        </>
      );
    }
  }
}

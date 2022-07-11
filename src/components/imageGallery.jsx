import { Component } from 'react';
import { ImageGalleryItem } from './imageGalleryItem';
import { ButtonMore } from './button';

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
  };

  requestFetch = (name, page) => {
    return fetch(
      `https://pixabay.com/api/?q=${name}&page=${page}&key=27562603-8a4226043483e253e97fc4251&image_type=photo&orientation=horizontal&per_page=12`
    ).then(respons => respons.json());
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.serchName !== this.props.serchName) {
      this.setState({ status: 'pending', page: 1 });

      // fetch(
      //   `https://pixabay.com/api/?q=${this.props.serchName}&page=${this.props.page}&key=27562603-8a4226043483e253e97fc4251&image_type=photo&orientation=horizontal&per_page=12`
      // )
      //   .then(respons => respons.json())
      this.requestFetch(this.props.serchName, 1)
        .then(arrayPictures => {
          if (arrayPictures.hits.length < 1) {
            return Promise.reject(
              new Error(`Can't find: "${this.props.serchName}"`)
            );
          }

          this.setState(prevState => ({
            arrayPictures: arrayPictures.hits,
            status: 'resolved',
          }));
        })
        .catch(error => {
          return this.setState(() => ({ error: error, status: 'rejected' }));
        });
    }

    if (prevState.page !== this.state.page) {
      this.requestFetch(this.props.serchName, this.state.page + 1).then(
        arrayPictures => {
          this.setState(prevState => {
            console.log(prevState.arrayPictures);
            console.log(arrayPictures.hits);
            return {
              arrayPictures: [
                ...prevState.arrayPictures,
                ...arrayPictures.hits,
              ],
            };
          });
        }
      );
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // onClickMore = () => {
  //   this.requestFetch(this.props.serchName, this.state.page + 1).then(
  //     arrayPictures => {
  //       this.setState(prevState => {
  //         return {
  //           arrayPictures: [...prevState.arrayPictures, ...arrayPictures.hits],
  //           page: this.state.page + 1,
  //         };
  //       });
  //     }
  //   );
  // };

  render() {
    if (this.state.status === 'pending') {
      return <h2>Іде загрузка</h2>;
    }

    if (this.state.status === 'rejected') {
      return <h2>{this.state.error.message}</h2>;
    }

    if (this.state.status === 'resolved') {
      return (
        <>
          <ul className="imageGallery">
            <ImageGalleryItem arrayPictures={this.state.arrayPictures} />
          </ul>
          <ButtonMore onClick={this.loadMore} />
        </>
      );
    }
  }
}

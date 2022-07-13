import { Component } from 'react';

export class Modal extends Component {
  render() {
    const { largeImageURL, tags } = this.props.picture[0];

    return (
      <div className="overlay">
        <div className="modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

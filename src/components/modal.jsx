import { Component } from 'react';

export class Modal extends Component {
  state = { modal: null };

  resetModal = () => {
    this.setState({ modal: null });
  };

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

      let result = this.props.picture.filter(
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
    if (!this.state.modal) {
      return;
    }

    const { largeImageURL, tags } = this.state.modal[0];

    return (
      <div className="overlay">
        <div className="modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

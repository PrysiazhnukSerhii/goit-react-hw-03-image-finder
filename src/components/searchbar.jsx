import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    carrentValue: '',
  };

  onChange = e => {
    this.setState(() => {
      return { carrentValue: e.target.value.toLowerCase() };
    });
  };

  onSubmitForm = e => {
    e.preventDefault();

    if (this.state.carrentValue.trim() === '') {
      alert('Куда бля');
      return;
    }

    this.props.onSubmit(this.state.carrentValue);

    this.reset();
  };

  reset = () => {
    this.setState(() => ({ carrentValue: '' }));
  };

  render() {
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.onSubmitForm}>
          <button type="submit" className="searchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="searchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
            value={this.state.carrentValue}
          />
        </form>
      </header>
    );
  }
}

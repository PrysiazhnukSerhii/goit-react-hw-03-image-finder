import { Searchbar } from './searchbar';
import { Component } from 'react';
import { ImageGallery } from './imageGallery';

export class App extends Component {
  state = {
    serchName: '',
  };

  takeName = e => {
    this.setState(() => ({ serchName: e }));
    return;
  };

  render() {
    return (
      <div className="app">
        <Searchbar onSubmit={this.takeName} />
        <ImageGallery serchName={this.state.serchName} />
      </div>
    );
  }
}

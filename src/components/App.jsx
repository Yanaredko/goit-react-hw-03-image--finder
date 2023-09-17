import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../index.css"
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { fetchImages } from '../api';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    modalImage: '',
    isLoadingMore: false, 
    noMoreImages: false,
  };

  handleSearch = (query) => {
    this.setState({ query, images: [], page: 1, noMoreImages: false }, this.loadImages);
  };

  loadImages = () => {
    const { query, page, isLoadingMore, noMoreImages } = this.state;

    if (isLoadingMore || noMoreImages) {
      this.setState((prevState) => ({
        page: prevState.page + 1,
        isLoadingMore: false, 
      }));
      return;
    }

    this.setState({ isLoading: true });

    fetchImages(query, page)
      .then((data) => {
        if (data.hits.length === 0) {
          this.setState({ noMoreImages: true });
          return;
        }

        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  openModal = (imageURL) => {
    this.setState({ showModal: true, modalImage: imageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  render() {
    const { images, isLoading, showModal, modalImage, isLoadingMore, noMoreImages } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => this.openModal(image.largeImageURL)}
            />
          ))}
        </ImageGallery>
        {isLoading && <Loader />}
         {images.length > 0 && !isLoading && !isLoadingMore && !noMoreImages && (
          <Button onClick={this.loadImages} />
        )}
        {showModal && (
          <Modal src={modalImage} alt="" onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

App.propTypes = {
  images: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showModal: PropTypes.bool.isRequired,
  modalImage: PropTypes.string.isRequired,
};

export default App;


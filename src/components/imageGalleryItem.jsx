export function ImageGalleryItem({ arrayPictures }) {
  let peintedPictures = arrayPictures.map(e => {
    return (
      <li className="imageGalleryItem" key={e.id}>
        <img
          className="imageGalleryItem-image"
          src={e.webformatURL}
          alt={e.tags}
        />
      </li>
    );
  });

  return peintedPictures;
}

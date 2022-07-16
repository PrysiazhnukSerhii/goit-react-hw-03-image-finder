const KEY = '27562603-8a4226043483e253e97fc4251';

export function getImages(name, page) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(respons => respons.json());
}

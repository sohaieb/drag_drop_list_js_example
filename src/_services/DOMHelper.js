export default class DOMHelper {
    static getTemplateDOM(id = 'postTemplate') {
        let temptTemplate = document.getElementById('postTemplate');
        return document.importNode(temptTemplate, true).content;
    }

    /**
     *
     * @param {Photo} photo
     */
    static addPhotoDOM(photo) {
        let photoDOM = this.getTemplateDOM();
        photoDOM.querySelector('.photo h3').textContent = photo.title;
        photoDOM.querySelector('.photo .link').href = photo.url;
        photoDOM.querySelector('.photo .photo-thumb .thumbnail').src = photo.thumbnailUrl;
        photoDOM.querySelector('.photo .photo-thumb .thumbnail').src = photo.thumbnailUrl;
        photoDOM.querySelector('.photo').dataset.id = photo.id;
        if (photo.isEven) {
            document.getElementById('pair').appendChild(photoDOM);
        } else {
            document.getElementById('impaire').appendChild(photoDOM);
        }
    }

    /**
     *
     * @param {HTMLElement} element
     */
    static scrollToEndOfView(element) {
        element.scrollBy({top: element.scrollHeight, behavior: 'smooth'});
    }
}

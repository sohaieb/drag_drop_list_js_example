import DOMHelper from "../_services/DOMHelper.js";
import DragAndDropHelper from "../_services/DragAndDropHelper.js";

export default class PhotoCollection {

    /**
     * odd : impraire
     * even: paire
     */
    constructor(collectionType = 'odd') {
        this.oddPhotos = [];
        this.evenPhotos = [];
    }

    /**
     *
     * @param {Photo} photo
     */
    addPhoto(photo) {
        if (photo.id % 2 === 0) {
            photo.isEven = true;
            this.evenPhotos.push(photo);
            DOMHelper.addPhotoDOM(photo);
            return;
        }
        photo.isEven = false;
        this.oddPhotos.push(photo);
        DOMHelper.addPhotoDOM(photo);
    }

    /**
     *
     * @param {Array<Photo>} photosResponse
     */
    fillCollections(photosResponse) {
        for (let photo of photosResponse) {
            this.addPhoto(photo);
        }
        DOMHelper.scrollToEndOfView(document.getElementById('pair'));
        DOMHelper.scrollToEndOfView(document.getElementById('impaire'));
        DragAndDropHelper.connectDrags(this);
    }

    /**
     *
     * @param {number} photoId
     */
    switchPhotoById(photoId) {
        let foundIndex = null;
        let photo = this.oddPhotos.find((photo, index) => {
                foundIndex = index;
                return photo.id == photoId;
            })
            ||
            this.evenPhotos.find((photo, index) => {
                foundIndex = index;
                return photo.id == photoId;
            });
        if (photo.isEven) {
            photo = this.evenPhotos.splice(foundIndex, 1)[0];
            photo.isEven = false;
            this.oddPhotos.push(photo);
        } else {
            photo = this.oddPhotos.splice(foundIndex, 1)[0];
            photo.isEven = true;
            this.evenPhotos.push(photo);
        }
    }

    /**
     * odd : impraire
     * even: paire
     *
     * @param {'odd'|'even'} type
     */
    clearCollection(type = 'odd') {
        switch (type) {
            case "even": {
                this.evenPhotos.length = 0;
                break;
            }
            case "odd": {
                this.oddPhotos.length = 0;
                break;
            }
        }
    }
}

import PhotoService from "./_services/PhotoService.js";
import PhotoCollection from "./_models/photo-collection.js";

export default class {
    static async main() {
        let photos = await PhotoService.getPhotos();
        let photoCollections = new PhotoCollection();
        photoCollections.fillCollections(photos);

    }
}

let singleton;
class PhotoService {
    async getPhotos() {
        let module = await import('./HttpClient.js');
        return module.default({limit: 15}).jsonResponse();
    }
}

export default (function (){
    if(singleton){
        return singleton;
    }
    singleton = new PhotoService();
    return singleton;
})();

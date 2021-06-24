import DOMHelper from "./DOMHelper.js";

export default class {
    static #currentList;
    static #draggedPhotoElem;
    static connectDrags(collection) {
        let posts = document.querySelectorAll('.photos');
        posts
            .forEach(
                post => {
                    this.setDragListeners(post, collection);
                }
            );
    }

    static setDragListeners(post, collection) {
        post.addEventListener('dragstart', (ev) => {
            this.#draggedPhotoElem = ev.target.closest('.photo');
            ev.dataTransfer.setData('text/plain',this.#draggedPhotoElem.dataset.id);
            ev.dataTransfer.effectAllowed = 'move';
            this.#currentList = ev.currentTarget;
        });
        post.addEventListener('dragenter', (ev) => {
            ev.preventDefault();
            let b = this.#currentList !== ev.currentTarget;
            if(b){
                ev.currentTarget.classList.add('dragover');
            }
        });

        post.addEventListener('dragover', (ev) => {
            ev.preventDefault();
        });

        post.addEventListener('dragend',(ev) => {
            let posts = document.querySelectorAll('.photos');
            posts
                .forEach(
                    post => {
                        post.classList.remove('dragover');
                    }
                );
        });
        post.addEventListener('drop',(ev)=> {
           let id = ev.dataTransfer.getData('text');
           collection.switchPhotoById(id);
            ev.currentTarget.appendChild(this.#draggedPhotoElem.cloneNode(true));
            ev.currentTarget.classList.remove('dragover');
            this.#draggedPhotoElem.remove();
            DOMHelper.scrollToEndOfView(document.getElementById(ev.currentTarget.id));
        });
    }
}

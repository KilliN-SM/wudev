class WUItemBlock extends HTMLElement
{
    constructor (item = null)
    {
        super();
        
        this._itemImg = document.createElement('img');
        this._hitBox = document.createElement('hitbox');
        this._hitBox.currentItem = item;

        this.appendChild(this._itemImg);
        this.appendChild(this._hitBox);

        item ? this.show(item) : this.hide();
    }

    hide ()
    {
        this.style.visibility = 'hidden';
        this._hitBox.currentItem = null;
        this._itemImg.src = '';
    }

    show (item)
    {
        this.style.visibility = '';
        this._hitBox.currentItem = item;
        this._itemImg.src = item.src;
    }

    get currentItem ()
    {
        return this._hitBox.currentItem;
    }
}
window.customElements.define('wu-item-block', WUItemBlock);

class WUItemSlot extends HTMLElement
{
    constructor (type, icon, item)
    {
        super();

        this.ready = false;

        $.getBlob(icon, blob =>
        {
            this._iconSrc = blob;
            item ? this.setItem(item) : this.clear();
            this.ready = true;
        });

        this.type = type;
        this._tips = $.dom('tips');
        this._gfx = $.dom('gfx');

        this.appendChild(this._gfx);
        this.appendChild(this._tips);

        const app = document.querySelector('app');
        const tab = new WUSelectItemTab(this);

        this.onclick = () => app.appendChild(tab);
    }

    setItem (item)
    {
        if (!item)
        {
            this.clear();
            return;
        }

        if (item.type !== this.type)
        {
            this.clear();
            throw new Error(`Attempt of equipping an item of type '${item.type}' in a slot of type '${this.type}'`);
        }

        this.currentItem = item;
        this._gfx.hoverData = { item };
        this._gfx.classList.add('outline');
        this._gfx.style.backgroundImage = `url(${item.src})`;
        window.workshop.updateMechSummary();
    }

    clear ()
    {
        this.currentItem = null;
        this._gfx.hoverData = null;
        this._gfx.classList.remove('outline');
        this._gfx.style.backgroundImage = `url(${this._iconSrc})`;
        
        window.workshop.updateMechSummary();
    }
}
window.customElements.define('wu-item-slot', WUItemSlot);
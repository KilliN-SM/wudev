class WUItemDataPanel extends HTMLElement
{
    constructor ()
    {
        super();
        
        this._name = $.dom('name');
        this._gfx  = $.dom('gfx');
        this._sum  = new WUBarBasedSum();

        this.appendChild(this._name);
        this.appendChild(this._gfx);
        this.appendChild(this._sum);
    }

    setItem (item)
    {
        if (!item)
        {
            this._name.innerText = '(Empty Slot)';
            return
        }
        this._name.innerText = item.name;
        this._gfx.style.backgroundImage = `url(${item.src})`;
        this._sum.setItem(item);
    }
}
window.customElements.define('wu-item-data-panel', WUItemDataPanel);

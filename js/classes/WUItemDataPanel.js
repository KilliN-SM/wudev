class WUItemDataPanel extends HTMLElement
{
    constructor ()
    {
        super();
        
        this._name = $.dom('name');
        this._gfx  = new Image();
        this._sum  = new WUSummary();
        //this._sum.style.gridArea = 'c';

        this.appendChild(this._name);
        this.appendChild(this._gfx);
        this.appendChild(this._sum);
    }

    setItem (item)
    {
        if (item)
        {
            this._name.innerText = item.name;
            this._gfx.src = item.src;
            this._gfx.style.visibility = '';
            this._sum.setItem(item);
        }
        else
        {
            this._name.innerText = '(Empty Slot)';
            this._gfx.style.visibility = 'hidden';
            this._sum.setItem(null);
        }
    }
}
window.customElements.define('wu-item-data-panel', WUItemDataPanel);

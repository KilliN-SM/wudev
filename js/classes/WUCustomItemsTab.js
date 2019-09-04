class WUCustomItemsTab extends HTMLElement
{
    constructor ()
    {
        super();

        this.addEventListener('click', e =>
        {
            if (e.target === this) this.hide();
        });

        this._list = document.createElement('item-list');
        this._createItemBtn = new WUButton({ text:'Create Custom Item' }, './img/general/plus.svg', e => console.log('create'));
        
        this.appendChild(this._list);
        this.appendChild(this._createItemBtn);

        this.hide();
    }

    hide ()
    {
        this.style.visibility = 'hidden';

        while (this._list.lastChild) this._list.lastChild.remove();
    }

    show ()
    {
        const items = $.getLS('custom_items');

        for (const item of items)
        {
            const block = new WUItemBlock(item);
        
            this._list.appendChild(block);
        }

        this.style.visibility = 'visible';
    }
}
window.customElements.define('wu-custom-items-tab', WUCustomItemsTab);

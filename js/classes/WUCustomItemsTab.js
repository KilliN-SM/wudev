class WUCustomItemsTab extends HTMLElement
{
    constructor ()
    {
        super();

        this.className = 'tab';

        this._list = document.createElement('item-list');
        this._createItemTab = new WUCreateItemTab();
        this._createItemBtn = new WUButton('Create New Item', './img/general/plus.svg', () =>
        {
            this.hide();
            this._createItemTab.show();
        });
        
        this.appendChild(this._list);
        this.appendChild(this._createItemBtn);
        
        window.workshop.appendChild(this._createItemTab);

        this.addEventListener('click', e =>
        {
            if (e.target === this) this.hide();
        });

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

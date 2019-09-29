class WUCustomItemsTab extends HTMLElement
{
    constructor ()
    {
        super();

        this.className = 'tab';

        this._list = document.createElement('item-list');
        this._panel = new WUItemDataPanel();
        this._createItemTab = new WUCreateItemTab();
        this._createItemBtn = new WUButton('Create New Item', './img/general/plus.svg', () =>
        {
            this.hide();
            this._createItemTab.show();
        });

        const buttonContainer = document.createElement('button-container');
        const btnEditItem = new WUButton('Edit item', './img/general/pencil.svg');
        const btnDeleteItem = new WUButton('Delete Item', './img/general/x.svg');
        
        btnDeleteItem.classList.add('evil-btn');

        this._panel.setItem(null);
        
        this.appendChild(this._list);
        this.appendChild(this._panel);
        this.appendChild(this._createItemBtn);

        this._panel.appendChild(buttonContainer);

        buttonContainer.appendChild(btnEditItem);
        buttonContainer.appendChild(btnDeleteItem);
        
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
        for (let i = window.workshop.customItems.length; i--;)
        {
            const item = window.workshop.customItems[i];
            const block = new WUItemBlock(item);
            block._hitBox.hoverData = { item };
            block.onmouseover = () => this._panel.setItem(block.currentItem);
            block.onmouseout  = () => this._panel.setItem(null);
            this._list.appendChild(block);
        }

        this.style.visibility = '';
    }
}
window.customElements.define('wu-custom-items-tab', WUCustomItemsTab);

class WUSelectItemTab extends HTMLElement
{
    constructor ()
    {
        super();

        this.className = 'tab';

        this._currentSlot = null;
        this._itemBlocks = [];
        this._list = document.createElement('item-list');
        this._panel = new WUItemDataPanel();

        this.appendChild(this._list);
        this.appendChild(this._panel);

        this.addEventListener('click', e =>
        {
            this.hide();

            const previousItem = this._currentSlot.currentItem;
            const item = e.target.currentItem || null;

            this._currentSlot.setItem(item);

            if (item !== previousItem)
            {
                window.workshop.updateMechSummary();
                window.workshop.updateActiveMech();

                if (this._currentSlot.type < 6)
                {
                    window.workshop.updateMechDisplay();
                }
            }
        });

        this.hide();
    }

    hide ()
    {
        this.style.visibility = 'hidden';
    }

    show (slot)
    {
        this.style.visibility = '';

        this._currentSlot = slot;
        this._panel.setItem(slot.currentItem);
        
        const items = window.workshop.items;
        const itemsOfSlotType = {
            1:[], // Physical
            2:[], // Explosive
            3:[]  // Electric
        };

        for (let i = 0; i < items.length; i++)
        {
            const item = items[i];

            if (item.type === slot.type)
            {
                itemsOfSlotType[item.element].push(item);
            }
        }

        const finalItemList = [...itemsOfSlotType[1], ...itemsOfSlotType[2], ...itemsOfSlotType[3]];

        for (let i = 0; i < finalItemList.length; i++)
        {
            if (this._itemBlocks[i])
            {
                this._itemBlocks[i].show(finalItemList[i]);
            }
            else
            {
                const block = new WUItemBlock(finalItemList[i]);
                block.onmouseover = () => this._panel.setItem(block.currentItem);
                block.onmouseout  = () => this._panel.setItem(slot.currentItem);
                this._itemBlocks.push(block);
                this._list.appendChild(block);
            }
        }

        if (this._itemBlocks.length > finalItemList.length)
        {
            for (let i = finalItemList.length; i < this._itemBlocks.length; i++)
            {
                this._itemBlocks[i].hide();
            }
        }
    }
}
window.customElements.define('wu-select-item-tab', WUSelectItemTab);
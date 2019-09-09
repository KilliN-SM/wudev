class WUSelectItemTab extends HTMLElement
{
    constructor ()
    {
        super();

        this.className = 'tab';

        this.list  = $.dom('item-list');
        this.panel = new WUItemDataPanel();

        this.appendChild(this.list);
        this.appendChild(this.panel);

        this.hide();
    }

    selectItem (item)
    {
        const previous = this.heldSlot.currentItem;

        this.heldSlot.setItem(item);

        if (item !== previous) window.workshop.updateMechSummary();
        if (this.heldSlot.type < 6) window.workshop.updateMechDisplay();

        this.hide();
    }

    hide ()
    {
        this.style.visibility = 'hidden';

        while (this.list.lastChild) this.list.lastChild.remove();
    }

    show (slot)
    {
        this.style.visibility = 'visible';

        this.heldSlot = slot;
        this.panel.setItem(slot.currentItem);

        const itemMap = {};

        for (const item of window.workshop.items)
        {
            if (item.type === slot.type)
            {
                if (itemMap[item.element]) itemMap[item.element].push(item);
                else itemMap[item.element] = [item];
            }
        }

        for (const element of Object.keys(itemMap))
        {
            itemMap[element].sort((a, b) => a.weight > b.weight ? 1 : -1);

            for (const item of itemMap[element])
            {
                const block = new WUItemBlock(item);

                if (item === slot.currentItem) block.classList.toggle('active');

                block.onmouseover = () => this.panel.setItem(block.item);

                block.onclick = () =>
                {
                    // if it's on mobile view mode
                    if (window.innerHeight > window.innerWidth || window.innerHeight < 450)
                    {
                        if (block.classList.contains('active')) this.selectItem(item);
                        else
                        {
                            this.panel.setItem(item);

                            const itemBlocks = Array.from(document.querySelectorAll('wu-item-block'));

                            for (const block of itemBlocks)
                            {
                                block.classList.contains('active') && block.classList.toggle('active');
                            }

                            block.classList.toggle('active');
                        }
                    }
                    else this.selectItem(item);
                };
                this.list.appendChild(block);
            }
        }

        this.onclick = e =>
        {
            if (e.target.nodeName !== 'HITBOX')
            {
                this.selectItem(null);
                this.hide();
            };
            
            window.workshop.updateActiveMech();
        };
    }
}
window.customElements.define('wu-select-item-tab', WUSelectItemTab);
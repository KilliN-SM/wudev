$.defineHTMLElement('wu-items-list', class WUItemsList extends HTMLElement
{
    constructor ()
    {
        super();

        this.blocks = [];
    }

    clear ()
    {
        for (let i = this.blocks.length; i--;)
        {
            this.blocks[i].hitbox.classList.remove('active');
            this.blocks[i].hide();
        }
    }

    set (items)
    {
        const itemsMap = {
            1: [],
            2: [],
            3: [],
        };

        for (let i = 0; i < items.length; i++) itemsMap[items[i].element].push(items[i]);

        items = [...itemsMap[1], ...itemsMap[2], ...itemsMap[3]];

        for (let i = 0; i < items.length; i++)
        {
            if (this.blocks[i]) this.blocks[i].show(items[i]);
            else
            {
                this.blocks[i] = new WUItemBlock(items[i]);
                this.appendChild(this.blocks[i]);
            }
        }
    }
});
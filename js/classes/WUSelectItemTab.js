$.defineHTMLElement('wu-select-item-tab', class WUSelectItemTab extends HTMLElement
{
    constructor ()
    {
        super();

        this.className = 'tab';

        this.currentSlot = null;
 
        $.appendAndRef(this, 'panel', new WUItemDataPanel());
        $.appendAndRef(this, 'list',  new WUItemsList());

        this.addEventListener('click', e =>
        {
            if (e.target.nodeName === 'HITBOX')
            {
                if (window.isTouchDevice)
                {
                    if (e.target.className.includes('active')) this.selectItem(e.target.item);
                    else
                    {
                        const active = this.list.querySelectorAll('hitbox.active');

                        for (let i = active.length; i--;) if (active[i].className.includes('active')) active[i].classList.remove('active');

                        e.target.classList.add('active');
                    }
                }
                else this.selectItem(e.target.item);
            }
            else this.selectItem(null);
        });
        this.addEventListener('mouseover', e =>
        {
            if (e.target.nodeName === 'HITBOX') this.panel.setItem(e.target.item);
            else this.panel.setItem(this.currentSlot.currentItem);
        });

        this.hide();
    }

    hide ()
    {
        this.style.visibility = 'hidden';
        this.list.clear();
    }

    show (slot)
    {
        this.style.visibility = '';

        this.currentSlot = slot;
        
        this.panel.setItem(slot.currentItem);

        const items = $.Array.filter(window.workshop.items, item => item.type === slot.type);

        this.list.set(items);
    }

    selectItem (item)
    {
        const previousItem = this.currentSlot.item;

        this.currentSlot.setItem(item);
        this.hide();

        if (item !== previousItem)
        {
            window.workshop.updateActiveMech();
            window.workshop.updateMechSummary();

            if (this.currentSlot.type < 6) window.workshop.updateMechDisplay();
        }
    }
});

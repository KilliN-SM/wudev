$.defineHTMLElement('wu-mech-part', class MechPart extends HTMLElement
{
    constructor ()
    {
        super();

        this.style.visibility = 'hidden';
        this.attachment = null;
        this.itemGfx = window.document.createElement('img');
        this.itemGfx.className = 'outline';

        this.appendChild(this.itemGfx);
    }

    setItem (item)
    {
        if (!item)
        {
            this.clear();
            return;
        }

        this.itemGfx.src = item.src;
        this.itemGfx.hoverData = { item };
        this.itemGfx.style.width = item.width ? item.width : '';
        this.itemGfx.style.height = item.height ? item.height : '';
        this.attachment = item.attachment;
        this.style.visibility = '';
    }

    clear ()
    {
        this.itemGfx.src = '';
        this.itemGfx.hoverData = null;
        this.style.visibility = 'hidden';
    }

    set x (x) { this.style.left = Number(x) + 'px' }
    set y (y) { this.style.top  = Number(y) + 'px' }
    get x ()  { return Number(this.style.left.replace(/[^\d|.]/g, '')) }
    get y ()  { return Number(this.style.top.replace(/[^\d|.]/g,  '')) }
    get w ()  { return this.itemGfx.getBoundingClientRect().width }
    get h ()  { return this.itemGfx.getBoundingClientRect().height }
});

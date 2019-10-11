$.defineHTMLElement('wu-item-block', class WUItemBlock extends HTMLElement
{
    constructor (item = null)
    {
        super();

        $.appendAndRef(this, 'img', document.createElement('img'));
        $.appendAndRef(this, 'hitbox', $.dom('hitbox', { item }));

        item ? this.show(item) : this.hide();
    }

    hide ()
    {
        this.style.visibility = 'hidden';
    }

    show (item)
    {
        this.style.visibility = '';
        this.hitbox.item = item;
        this.img.src = item.src;
    }

    get item ()
    {
        return this.hitbox.item;
    }

    set hoverData (data)
    {
        this.hitbox.hoverData = data;
    }
});

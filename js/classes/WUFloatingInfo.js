class WUFloatingInfo extends HTMLElement
{
    constructor ()
    {
        super();

        this.currentData = null;

        const update = e =>
        {
            if (e.target.hoverData)
            {
                if (e.target.hoverData !== this.currentData) this.show(e.target.hoverData);
            }
            else this.hide();

            if (this.visible)
            {
                if (e.clientX > window.innerWidth / 2) this.x = e.clientX - this.offsetWidth - 20;
                else this.x = e.clientX + 20;

                if (e.clientY > window.innerHeight / 2) this.y = e.clientY - this.offsetHeight - 20;
                else this.y = e.clientY + 20;
            }
        };

        window.addEventListener('mousemove', update);

        this.hide();
    }

    get visible ()
    {
        return this.style.visibility === 'visible';
    }

    set x (n)
    {
        this.style.left = n + 'px';
    }

    set y (n)
    {
        this.style.top = n + 'px';
    }

    show (data)
    {
        while (this.lastChild) this.lastChild.remove();
        this.currentData = data;
        this.append(data);
        this.style.visibility = 'visible';
    }

    hide ()
    {
        while (this.lastChild) this.lastChild.remove();
        this.currentData = null;
        this.style.visibility = 'hidden';
    }
}
window.customElements.define('wu-floating-info', WUFloatingInfo);
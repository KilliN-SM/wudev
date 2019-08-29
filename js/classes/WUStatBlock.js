class WUStatBlock extends HTMLElement
{
    constructor (data)
    {
        super();

        this.title = data.context;
        this.statData = data;

        this._icon = $.dom('icon');
        this._value = $.dom('value');
        this._quote = $.dom('quote');

        this._icon.style.backgroundImage = `url(${data.src})`;

        this.appendChild(this._icon);
        this.appendChild(this._value);
        this.appendChild(this._quote);
    }

    value (any)
    {
        if (typeof any !== 'undefined') this._value.innerHTML = String(any);
        return this._value.innerHTML;
    }

    quote (any, color)
    {
        if (color) this._quote.style.color = color;
        if (typeof any !== 'undefined') this._quote.innerHTML = String(any);
        return this._quote.innerHTML;
    }
}
window.customElements.define('wu-stat-block', WUStatBlock);
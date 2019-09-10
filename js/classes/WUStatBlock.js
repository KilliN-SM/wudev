class WUStatBlock extends HTMLElement
{
    constructor (data)
    {
        super();

        this.hoverData = { text:data.context };
        this.statData = data;

        this._icon  = $.dom('img',   { hoverData:{ text:data.context }});
        this._value = $.dom('value', { hoverData:{ text:data.context }});
        this._quote = $.dom('quote', { hoverData:{ text:data.context }});

        this._icon.src = data.src;

        this.appendChild(this._icon);
        this.appendChild(this._value);
        this.appendChild(this._quote);
    }

    value (any)
    {
        if (typeof any !== 'undefined') this._value.innerText = String(any);
        return Number(this._value.innerText);
    }

    quote (any, color)
    {
        if (color) this._quote.style.color = color;
        if (typeof any !== 'undefined') this._quote.innerText = String(any);
        return this._quote.innerText;
    }
}
window.customElements.define('wu-stat-block', WUStatBlock);
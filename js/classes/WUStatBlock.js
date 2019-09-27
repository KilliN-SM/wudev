class WUStatBlock extends HTMLElement
{
    constructor (statData, value)
    {
        super();

        const hoverData = { text:statData.context };

        this.hoverData = hoverData;

        if (Array.isArray(value))
        {
            for (let i = 0; i < value.length; i++)
            {
                if (!value[i] || value[i] === value[i - 1]) value.splice(i, 1);
            }
        }

        const icon = $.css($.dom('img', { hoverData, src:statData.src }), { gridArea:'icon' });
        const text = $.css($.dom('div', { hoverData, innerText:String(value).replace(',', '-') }), { gridArea:'text' });
        
        this.appendChild(icon);
        this.appendChild(text);
    }
}
window.customElements.define('wu-stat-block', WUStatBlock);

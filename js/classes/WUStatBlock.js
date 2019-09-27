class WUStatBlock extends HTMLElement
{
    constructor (statData, value)
    {
        super();

        this.hoverData = { text:statData.context };

        if (Array.isArray(value))
        {
            for (let i = 0; i < value.length; i++)
            {
                if (!value[i] || value[i] === value[i - 1]) value.splice(i, 1);
            }
        }

        const icon = $.css($.dom('img', { hoverData:{ text:statData.context }, src:statData.src }), { gridArea:'icon' });
        const text = $.css($.dom('div', { hoverData:{ text:statData.context }, innerText:String(value).replace(',', '-') }), { gridArea:'text' });
        
        this.appendChild(icon);
        this.appendChild(text);
    }
}
window.customElements.define('wu-stat-block', WUStatBlock);

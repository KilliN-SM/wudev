class WUBarBasedSumBar extends HTMLElement
{
    constructor ({ stat, item })
    {
        super();

        if (typeof item.stats[stat.name] === 'undefined') console.log(stat.name) || console.table(item);

        this.title = stat.context;
        this.ico = new Image();
        this.bar = $.dom('bar');
        this.val = $.dom('val', { className:'outline' });

        this.ico.src = stat.src;
        this.bar.style.backgroundColor = stat.color;

        const top = window.workshop.topStatMap[item.type][stat.name];
        const val = item.stats[stat.name];

        let barWidthProcent = 0;
        let valOutput = String(item.stats[stat.name]).replace(',', '-');

        if (typeof val === 'number')
        {
            if ($.eq(stat.name, 'phyRes', 'expRes', 'eleRes'))
            {
                barWidthProcent = (Number(val) || 0) / (Number(window.workshop.topStatMap[item.type].res) || 0) * 100;
            }
            else
            {
                barWidthProcent = (Number(val) || 0) / (Number(top) || 0) * 100;
            }
        }
        else if (typeof val === 'object')
        {
            if ($.eq(stat.name, 'phyDmg', 'expDmg', 'eleDmg'))
            {
                const top = window.workshop.topStatMap[item.type]['dmg'];
                barWidthProcent = (val[0] + val[1]) / (top[0] + top[1]) * 100;
            }
            else
            {
                barWidthProcent = (val[0] + val[1]) / (top[0] + top[1]) * 100;
            }
        }
        else if (typeof val === 'boolean' && val)
        {
            barWidthProcent = 100;
            valOutput = stat.context;
        }

        this.bar.style.width = barWidthProcent.toFixed(1) + '%';
        this.val.innerHTML = valOutput;        
        this.appendChild(this.ico);
        this.appendChild(this.val);
        this.appendChild(this.bar);
    }
}
window.customElements.define('wu-bar-based-sum-bar', WUBarBasedSumBar);

class WUBarBasedSum extends HTMLElement
{
    // constructor () {}

    setItem (item)
    {
        while (this.lastChild) this.lastChild.remove();

        if (!item || !item.stats) return;

        const statNames = Object.keys(item.stats);

        for (const name of statNames)
        {
            const stat = window.workshop.statsData[name];
            const bar  = new WUBarBasedSumBar({ stat, item });

            this.appendChild(bar);
        }
    }
}
window.customElements.define('wu-bar-based-sum', WUBarBasedSum);

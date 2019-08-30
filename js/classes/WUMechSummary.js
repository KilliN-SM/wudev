class WUMechSummary extends HTMLElement
{
    constructor (stats, setup)
    {
        super();

        this.statNames = [];

        for (const stat of stats)
        {
            if (!stat) console.error(`Unknown stat '${stat}'`);
            this.statNames.push(stat.name);
            this[stat.name] = new WUStatBlock(stat);
            this.appendChild(this[stat.name]);
        }

        this.set(setup || []);
    }

    set (setup)
    {
        const statMap = {};

        for (const s of this.statNames)
        {
            statMap[s] = 0;
            for (const item of setup) if (item.stats[s]) statMap[s] += item.stats[s];

            if (statMap[s] && $.getLS('arena_buffs') && this[s].statData.buff)
            {
                let val = Math.round(eval(`${statMap[s]} ${this[s].statData.buff.mode} ${this[s].statData.buff.amount}`));

                if (s === 'health' && statMap.weight - 1000 > 0) val -= (statMap.weight - 1000) * 15;

                this[s].value(val);
                this[s].quote(`(+${val - statMap[s]})`, '#6F8');
            }
            else
            {
                this[s].value(statMap[s]);

                if (s !== 'weight') this[s].quote('');
                else
                {
                    if (statMap[s] > 994)  this[s].quote('good', '#6F8');
                    else
                    {
                        this[s].quote('');
                        continue;
                    }
                    if (statMap[s] > 999)  this[s].quote('perfect', '#86F');
                    if (statMap[s] > 1000) this[s].quote('heavy', '#FA8');
                    if (statMap[s] > 1010) this[s].quote('over', '#F66');
                }
            }
        }
    }
}
window.customElements.define('wu-mech-summary', WUMechSummary);

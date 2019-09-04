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

        for (const statName of this.statNames)
        {
            statMap[statName] = 0;

            for (const item of setup)
            {
                if (item.stats[statName])
                {
                    statMap[statName] += item.stats[statName];
                }
            }

            this[statName].quote('');
        }

        if ($.getLS('arena_buffs'))
        {
            for (const statName of this.statNames)
            {
                if (!statMap[statName] || !this[statName].statData.buff) continue;

                const buffData  = this[statName].statData.buff;
                const buffedVal = Math.round(eval(statMap[statName] + buffData.mode + buffData.amount));
                const buffExtra = buffedVal - statMap[statName];

                this[statName].quote(`(+${ buffExtra })`);
                this[statName]._quote.hoverData = { text:`+${buffExtra} ${this[statName].statData.context} from Arena Buffs` };

                statMap[statName] = buffedVal;
            }
        }

        if (statMap.weight > 1000)
        {
            const healthNerf = (statMap.weight - 1000) * 15;
            
            statMap.health -= healthNerf;

            if (statMap.weight > 1010) this.weight.quote('over', '#F66');
            else this.weight.quote('heavy', '#FA8');
        }
        else if (statMap.weight > 994)
        {
            if (statMap.weight === 1000) this.weight.quote('perfect', '#86F');
            else this.weight.quote('good', '#6F8');
        }
        else this.weight.quote('');

        for (const statName of this.statNames) this[statName].value(statMap[statName]);
        console.log(statMap);
    }
}
window.customElements.define('wu-mech-summary', WUMechSummary);

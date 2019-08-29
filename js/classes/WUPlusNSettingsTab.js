class WUSwitchButton extends HTMLElement
{
    constructor (oninput)
    {
        super();

        const checked = Boolean($.getLS('arena_buffs'));

        this.appendChild($.dom('input', { type:'checkbox', oninput, checked }));
        this.appendChild($.dom('runnable-track'));
        this.appendChild($.dom('togglable-thumb'));
    }
}
window.customElements.define('wu-switch-button', WUSwitchButton);

class WUPlusNSettingsTab extends HTMLElement
{
    constructor ()
    {
        super();

        const switchContainer = $.dom('switch-container');
        const cw = $.dom('content-wrapper');
        const arenaBuffsSwitch = new WUSwitchButton(e =>
        {
            window.workshop.toggleArenaBuffs(e.target.checked);
        });

        this.onclick = e =>
        {
            if (e.target === this) this.style.visibility = 'hidden';
        }

        switchContainer.appendChild(arenaBuffsSwitch);
        switchContainer.append(' Arena Buffs');
        cw.appendChild(switchContainer);
        this.appendChild(cw);
    }

    show ()
    {
        this.style.visibility = 'visible';
    }

    hide ()
    {
        this.style.visibility = 'hidden';
    }
}
window.customElements.define('wu-plus-n-settings-tab', WUPlusNSettingsTab);

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

        this.appendChild(cw);
        cw.appendChild(switchContainer);
        switchContainer.appendChild(arenaBuffsSwitch);
        switchContainer.appendChild($.dom('text', { innerHTML:'Arena Buffs' }));
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

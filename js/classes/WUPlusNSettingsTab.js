class WUSwitchButton extends HTMLElement
{
    constructor (checked, oninput)
    {
        super();

        const inputData = {
            type: 'checkbox',
            checked,
            oninput,
        }

        this.appendChild($.dom('input', inputData));
        this.appendChild($.dom('runnable-track'));
        this.appendChild($.dom('togglable-thumb'));
    }
}
window.customElements.define('wu-switch-button', WUSwitchButton);


class WUSwitchContainer extends HTMLElement
{
    constructor (innerText, checked, oninput)
    {
        super();

        this.appendChild(new WUSwitchButton(checked, oninput));
        this.appendChild($.dom('text', { innerText }));
    }
}
window.customElements.define('wu-switch-container', WUSwitchContainer);


class WUPlusNSettingsTab extends HTMLElement
{
    constructor ()
    {
        super();

        this.className = 'tab';

        const app = document.querySelector('app');
        const customItemsTab = new WUCustomItemsTab();
        
        app.appendChild(customItemsTab);

        const cw = $.dom('content-wrapper', { className:'box border' });
        const switchsContainer = $.dom('switchs-container');
        const arenaBuffsSwitch = new WUSwitchContainer('Arena Buffs', $.getLS('arena_buffs'), e =>
        {
            $.setLS('arena_buffs', Boolean(e.target.checked));
            window.workshop.updateMechSummary();
        });
        const divineTierSwitch = new WUSwitchContainer('Divine Tier (off)', $.getLS('divine_tier'), e =>
        {
            $.setLS('divine_tier', Boolean(e.target.checked));
            window.workshop.updateMechSummary();
        });
        const customItemsButton = new WUButton({ text:'Custom Items' }, './img/general/customitems.png', () =>
        {
            this.hide();
            customItemsTab.show();
        });
        const mechsListButton = new WUButton({ text:'Your Mechs' }, './img/general/mech.svg', () =>
        {
            console.log('mechsListTab.show();');
        });

        switchsContainer.style.gridArea  = 'a';
        customItemsButton.style.gridArea = 'b';
        mechsListButton.style.gridArea   = 'c';

        switchsContainer.appendChild(arenaBuffsSwitch);
        switchsContainer.appendChild(divineTierSwitch);

        cw.appendChild(switchsContainer);
        cw.appendChild(customItemsButton);
        cw.appendChild(mechsListButton);

        this.appendChild(cw);

        const onclick = e => { e.target === this && this.hide() };

        this.addEventListener('click', onclick);
        this.hide();
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

/*
arena buffs
divine tier
mechs list
share mech
custom items
*/
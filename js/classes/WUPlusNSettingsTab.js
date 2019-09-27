class WUSwitchButton extends HTMLElement
{
    constructor (checked, oninput)
    {
        super();

        this.appendChild($.dom('input', { type:'checkbox', checked, oninput }));
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

        function newSwitchContainer (text, checked, oninput)
        {
            const label = document.createElement('label');
            const switchButton = new WUSwitchButton(checked, oninput);
            const switchContext = document.createElement('switch-context');
            //const hitbox = document.createElement('hitbox');
            
            label.className = 'switch-container';

            switchContext.innerText = text;

            //hitbox.hoverData = { text };

            label.appendChild(switchButton);
            label.appendChild(switchContext);
            //label.appendChild(hitbox);

            return label;
        }

        const switchArenaBuffsEvent = function(e)
        {
            $.setLS('arena_buffs', Boolean(e.target.checked));
            window.workshop.updateMechSummary();
        };
        const switchDivineTierEvent = function(e)
        {
            $.setLS('divine_tier', Boolean(e.target.checked));
            window.workshop.updateMechSummary();
        };
        const switchArenaBuffsOffsetEvent = function(e)
        {
            $.setLS('arena_buffs_offset', Boolean(e.target.checked));
            window.workshop.updateMechSummary();
        };
        const buttonCustomItemsEvent = () =>
        {
            this.hide();
            tabCustomItems.show();
        };
        const buttonMechsListEvent = () =>
        {
            this.hide();
            //tabMechsList.show();
        };


        const contentWrapper = document.createElement('content-wrapper');
        const tabCustomItems = new WUCustomItemsTab();
        //const tabMechsList = new WUMechsListTab();
        const switchArenaBuffs = newSwitchContainer('Arena Buffs', $.getLS('arena_buffs'), switchArenaBuffsEvent);
        const switchArenaBuffsOffset = newSwitchContainer('Arena Buffs Offset', $.getLS('arena_buffs_offset'), switchArenaBuffsOffsetEvent);
        const switchDivineTier = newSwitchContainer('Divine Tier', $.getLS('divine_tier'), switchDivineTierEvent);
        const buttonCustomItems = new WUButton('Custom Items', './img/general/customitems.png', buttonCustomItemsEvent);
        const buttonMechsList = new WUButton('Your Mechs', './img/general/mech.svg', buttonMechsListEvent);
        const buttonClearCache = new WUButton('Clear cache and refresh', './img/general/x.svg', () => window.location.reload(true));
        const buttonCloseTab = new WUButton('Close', './img/general/x.svg', () => this.hide());

        buttonCloseTab.classList.add('close');

        this.appendChild(contentWrapper);

        contentWrapper.className = 'box border';
        contentWrapper.appendChild(switchArenaBuffs);
        contentWrapper.appendChild(switchArenaBuffsOffset);
        contentWrapper.appendChild(switchDivineTier);
        contentWrapper.appendChild(buttonCustomItems);
        contentWrapper.appendChild(buttonMechsList);
        contentWrapper.appendChild(buttonClearCache);
        contentWrapper.appendChild(buttonCloseTab);

        window.workshop.appendChild(tabCustomItems);
        //window.workshop.appendChild(tabMechsList);

        this.addEventListener('click', e => {
            if (e.target === this) this.hide();
        });

        this.hide();
    }

    show ()
    {
        this.style.visibility = '';
    }

    hide ()
    {
        this.style.visibility = 'hidden';
    }
}
window.customElements.define('wu-plus-n-settings-tab', WUPlusNSettingsTab);

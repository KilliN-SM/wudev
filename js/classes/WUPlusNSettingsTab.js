$.defineHTMLElement('wu-switch-button', class WUSwitchButton extends HTMLElement
{
    constructor (checked, oninput)
    {
        super();

        this.appendChild($.dom('input', { type:'checkbox', checked, oninput }));
        this.appendChild(document.createElement('runnable-track'));
        this.appendChild(document.createElement('togglable-thumb'));
    }
});


$.defineHTMLElement('wu-switch-container', class WUSwitchContainer extends HTMLElement
{
    constructor (innerText, checked, oninput)
    {
        super();

        this.appendChild(new WUSwitchButton(checked, oninput));
        this.appendChild($.dom('text', { innerText }));
    }
});


$.defineHTMLElement('wu-plus-n-settings-tab', class WUPlusNSettingsTab extends HTMLElement
{
    constructor ()
    {
        super();

        this.className = 'tab';

        function newSwitchContainer (text, checked, oninput)
        {
            const label = document.createElement('label');
            const switchbtn = new WUSwitchButton(checked, oninput);
            const switchContext = document.createElement('switch-context');
            //const hitbox = $.dom('hitbox', { hoverData:{ text } });
            
            label.className = 'switch-container';

            switchContext.innerText = text;

            label.appendChild(switchbtn);
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
        const btnCustomItemsEvent = () =>
        {
            this.hide();
            window.workshop.customItemsTab.show();
        };
        const btnMechsListEvent = () =>
        {
            this.hide();
            //tabMechsList.show();
        };


        const contentWrapper = document.createElement('content-wrapper');
        //const tabMechsList = new WUMechsListTab();
        const switchArenaBuffs = newSwitchContainer('Arena Buffs', $.getLS('arena_buffs'), switchArenaBuffsEvent);
        const switchArenaBuffsOffset = newSwitchContainer('Arena Buffs Offset', $.getLS('arena_buffs_offset'), switchArenaBuffsOffsetEvent);
        const switchDivineTier = newSwitchContainer('Divine Tier', $.getLS('divine_tier'), switchDivineTierEvent);
        const btnsCont = document.createElement('buttons-container');
        const btnCustomItems = new WUButton('Custom Items', './img/general/customitems.png', btnCustomItemsEvent);
        const btnMechsList = new WUButton('Your Mechs', './img/general/mech.svg', btnMechsListEvent);
        const btnClearCache = new WUButton('Refresh', './img/general/refresh.svg', () => window.location.reload(true));
        const btnDismountMech = new WUButton('Dismount Mech', './img/general/bin.png', () =>
        {
            this.hide();
            window.workshop.dismountMech();
        });

        this.appendChild(contentWrapper);


        contentWrapper.className = 'box border';
        switchArenaBuffsOffset.classList.add('pc-only');

        contentWrapper.appendChild($.dom('close-tab-btn', { onclick:() => this.hide() }));
        contentWrapper.appendChild(switchArenaBuffs);
        contentWrapper.appendChild(switchArenaBuffsOffset);
        contentWrapper.appendChild(switchDivineTier);
        btnsCont.appendChild(btnCustomItems);
        btnsCont.appendChild(btnMechsList);
        btnsCont.appendChild(btnClearCache);
        btnsCont.appendChild(btnDismountMech);
        contentWrapper.appendChild(btnsCont);

        //window.workshop.appendChild(tabMechsList);

        this.addEventListener('click', e => (e.target === this) && this.hide());

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
});

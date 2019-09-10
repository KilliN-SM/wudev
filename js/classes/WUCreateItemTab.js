class WUCreateItemTab extends HTMLElement
{
    constructor ()
    {
        super();

        this.className = 'tab';

        const inputCont = $.dom('inputs-container');
        const nameInput = $.dom('input', { type:'text', spellcheck:false });
        const elemInput = $.dom('select');
        const typeInput = $.dom('select');
        
        const elemOptions = ['Physical', 'Explosive', 'Electric'];
        const typeOptions = [
            'Torso', 'Leg', 'Side Weapon', 'Top Weapon',
            'Drone', 'Charge Engine', 'Teleporter', 'Hook'
        ];

        for (let i = 0; i < elemOptions.length; i++) elemInput.appendChild($.dom('option', { value:i+1, innerText:elemOptions[i] }));
        for (let i = 0; i < typeOptions.length; i++) typeInput.appendChild($.dom('option', { value:i+1, innerText:typeOptions[i] }));

        this.onclick = e => e.target === this && this.hide();

        inputCont.appendChild(nameInput);
        inputCont.append('is an');
        inputCont.appendChild(elemInput);
        inputCont.appendChild(typeInput);
        this.appendChild(inputCont);

        this.hide();
    }

    hide ()
    {
        this.style.visibility = 'hidden';
    }

    show ()
    {
        this.style.visibility = '';
    }
}
window.customElements.define('wu-create-item-tab', WUCreateItemTab);
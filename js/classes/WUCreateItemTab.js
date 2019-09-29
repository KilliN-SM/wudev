class WUCreateItemTab extends HTMLElement
{
    constructor ()
    {
        super();

        this.className = 'tab';

        let item = {
            custom: true,
            tiers: [4, 5],
            stats: {},
        };


        // STEP 1

        const elemOptions = ['Physical', 'Explosive', 'Electric'];
        const typeOptions = [
            'Torso', 'Leg', 'Side Weapon',
            'Top Weapon', 'Drone', 'Charge Engine',
            'Teleporter', 'Hook', 'Module'
        ];


        const btnStep1ContinueEvent = () =>
        {
            imgPreview.onload = () =>
            {
                this._step1ContentWrapper.style.display = 'none';
                this._step2ContentWrapper.style.display = 'flex';
            };
            imgPreview.onerror = () =>
            {
                const src = inputImgSrc.value;

                inputImgSrc.value = 'invalid!';

                setTimeout(function ()
                {
                    if (inputImgSrc.value === 'invalid!')
                    {
                        inputImgSrc.value = src;
                    }
                }, 2000);
            };
            imgPreview.src = inputImgSrc.value;
        };
        
        const inputImgSrcEvent = e =>
        {
            imgPreview.style.display = 'block';
            imgPreview.src = e.target.value;
        };


        this._step1ContentWrapper = document.createElement('step-1-content-wrapper');
        const nameInput = document.createElement('input');
        const imgPreview = document.createElement('img');
        const typeAndElementContainer = document.createElement('type-n-element-container');
        const elemInput = document.createElement('select');
        const typeInput = document.createElement('select');
        const inputImgSrc = document.createElement('input');
        const btnStep1Continue = new WUButton('Continue', '../img/icons/stats/advance.svg', btnStep1ContinueEvent);


        this._step1ContentWrapper.className = 'box border';

        nameInput.type = 'text';
        nameInput.placeholder = 'Item Name';
        nameInput.spellcheck = false;

        imgPreview.style.display = 'none';
        imgPreview.className = 'img-preview';

        for (let i = 0; i < elemOptions.length; i++) elemInput.appendChild($.dom('option', { value:i+1, innerText:elemOptions[i] }));
        for (let i = 4; i < typeOptions.length; i++) typeInput.appendChild($.dom('option', { value:i+1, innerText:typeOptions[i] }));

        inputImgSrc.type = 'text';
        inputImgSrc.placeholder = 'Image Link';
        inputImgSrc.spellcheck = false;
        inputImgSrc.addEventListener('input', inputImgSrcEvent);

        btnStep1Continue.classList.add('continue-btn');


        this.appendChild(this._step1ContentWrapper);

        typeAndElementContainer.appendChild(elemInput);
        typeAndElementContainer.appendChild(typeInput);

        this._step1ContentWrapper.appendChild(nameInput);
        this._step1ContentWrapper.appendChild(imgPreview);
        this._step1ContentWrapper.appendChild(typeAndElementContainer);
        this._step1ContentWrapper.appendChild(inputImgSrc);
        this._step1ContentWrapper.appendChild(btnStep1Continue);


        // STEP 2

        const statNames = Object.keys(window.workshop.statsData);
        const statInputBlocks = [];

        const btnStep2ContinueEvent = () =>
        {
            item.name    = nameInput.value || '(unnamed)';
            item.url     = inputImgSrc.value;
            item.type    = Number(typeInput.value);
            item.element = Number(elemInput.value);

            for (let i = statInputBlocks.length; i--;)
            {
                const e = statInputBlocks[i];
                const value = e.getVal();

                if ((Array.isArray(value) && (value[0] || value[1])) || (value && typeof value === 'number') || value === true) item.stats[e.stat.name] = value;
            }

            if (item.type > 4)
            {
                window.workshop.defineCustomItem(item);
                this.hide();
            }

            this._step2ContentWrapper.style.display = 'none';
            this._step3ContentWrapper.style.display = 'grid';
        };

        this._step2ContentWrapper = document.createElement('step-2-content-wrapper');
        const statInputBlocksContainer = document.createElement('stat-input-blocks-container');
        const btnStep2Continue = new WUButton('Continue', '../img/icons/stats/advance.svg', btnStep2ContinueEvent);

        this._step2ContentWrapper.className = 'box border';
        this._step2ContentWrapper.style.display = 'none';

        btnStep2Continue.classList.add('continue-btn');

        for (let i = 0; i < statNames.length; i++)
        {
            const stat = window.workshop.statsData[statNames[i]];
            const statInputBlock = document.createElement('stat-input-block');
            const icon = document.createElement('img');

            statInputBlock.inputs = [];
            statInputBlock.stat = stat;

            icon.src = stat.src;

            statInputBlock.appendChild(icon);

            if (stat.type === 'num')
            {
                for (let i = 0; i < stat.inputs; i++)
                {
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.placeholder = '0';
                    statInputBlock.inputs.push(input);
                    if (statInputBlock.inputs.length > 1) statInputBlock.append('-');
                    statInputBlock.appendChild(input);

                    statInputBlock.getVal = () =>
                    {
                        if (statInputBlock.inputs.length > 1)
                        {
                            const val = [];

                            for (let i = 0; i < statInputBlock.inputs.length; i++) val.push(Number(statInputBlock.inputs[i].value));

                            return val;
                        }
                        else return Number(statInputBlock.inputs[0].value);
                    };
                }
            }
            else
            {
                const input = new WUSwitchButton()
                statInputBlock.appendChild(input);
                statInputBlock.getVal = () => Boolean(input.checked);
            }

            statInputBlocks.push(statInputBlock);

            statInputBlock.append(stat.context);

            statInputBlocksContainer.appendChild(statInputBlock);
        }

        this.appendChild(this._step2ContentWrapper);

        this._step2ContentWrapper.appendChild(statInputBlocksContainer);
        this._step2ContentWrapper.appendChild(btnStep2Continue);


        // STEP 3
        const btnStep3FinishEvent = () =>
        {
            this.hide();
        };

        this._step3ContentWrapper = document.createElement('step-3-content-wrapper');
        const btnStep3Finish = new WUButton('Continue', '../img/icons/stats/advance.svg', btnStep3FinishEvent);

        this._step3ContentWrapper.style.display = 'none';

        this.appendChild(this._step3ContentWrapper);

        this._step3ContentWrapper.appendChild(btnStep3Finish);


        // END

        this.addEventListener('click', e =>
        {
            if (e.target === this) this.hide();
        });

        this.hide();
    }

    hide ()
    {
        this.style.visibility = 'hidden';
    }

    show ()
    {
        this.style.visibility = '';
        this._step1ContentWrapper.style.display = '';
        this._step2ContentWrapper.style.display = 'none';
    }
}
window.customElements.define('wu-create-item-tab', WUCreateItemTab);

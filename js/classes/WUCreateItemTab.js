$.defineHTMLElement('wu-create-item-tab', class WUCreateItemTab extends HTMLElement
{
    constructor ()
    {
        super();

        this.className = 'tab';

        this.steps = [this._createStep0(), this._createStep1()];

        for (let i = 0; i < this.steps.length; i++) this.appendChild(this.steps[i]);


        // STEP 2
        const btnStep3FinishEvent = () =>
        {
            this.hide();
        };

        this._step3ContentWrapper = document.createElement('step-3-content-wrapper');
        const btnStep3Finish = new WUButton('Continue', './img/icons/stats/advance.svg', btnStep3FinishEvent);

        this._step3ContentWrapper.style.display = 'none';

        this.appendChild(this._step3ContentWrapper);

        this._step3ContentWrapper.appendChild(btnStep3Finish);


        // END

        this.addEventListener('click', e => (e.target === this) && this.hide());

        this.hide();
    }

    hide ()
    {
        this.style.visibility = 'hidden';
    }

    show (step = 0, item)
    {
        this.style.visibility = '';
        this.steps[step].show(item);

        for (let i = 0; i < this.steps.length; i++) if (i !== step) this.steps[i].hide();
    }

    _createStep0 ()
    {
        const cw = $.dom('step-0-content-wrapper', {
            className: 'box border',
            currentItem: null,
            hide: () => cw.style.display = 'none',
            show: function (item = { custom:true, tiers:[4, 5], stats:{} })
            {
                cw.style.display = 'block';
                cw.currentItem = item;
            },
        });
        const content = document.createElement('full-content');
        const inputName = $.dom('input', { type:'text', spellcheck:false, placeholder:'name' });
        const inputURL = $.dom('input', { type:'text', spellcheck:false, placeholder:'image link' });
        const typeCont = document.createElement('type-n-element-container');
        const inputType = $.dom('select', { oninput:e => cw.currentItem.type = Number(e.target.value) });
        const inputElement = $.dom('select', { oninput:e => cw.currentItem.element = Number(e.target.value) });
        const btnContinue = new WUButton('Continue', './img/icons/stats/advance.svg', () =>
        {
            const item = cw.currentItem;

            item.name = inputName.value;
            item.url = inputURL.value;
            item.type = Number(inputType.value);
            item.element = Number(inputElement.value);

            this.show(1, cw.currentItem);
        });

        const elemOptions = ['Physical', 'Explosive', 'Electric'];
        const typeOptions = ['Torso', 'Leg', 'Side Weapon', 'Top Weapon', 'Drone', 'Charge Engine', 'Teleporter', 'Hook', 'Module'];

        for (let i = 4; i < typeOptions.length; i++) inputType.appendChild($.dom('option', { value:i+1, innerText:typeOptions[i] }));
        for (let i = 0; i < elemOptions.length; i++) inputElement.appendChild($.dom('option', { value:i+1, innerText:elemOptions[i] }));


        content.appendChild(inputName);
        content.appendChild(inputURL);

        typeCont.appendChild(inputType);
        typeCont.appendChild(inputElement);

        content.appendChild(typeCont);
        content.appendChild(btnContinue);

        cw.appendChild(content);


        return cw;
    }

    _createStep1 ()
    {
        const cw = $.dom('step-1-content-wrapper', {
            className: 'box border',
            currentItem: null,
            hide: () => cw.style.display = 'none',
            show: function (item)
            {
                cw.style.display = 'block';
                cw.currentItem = item;
            },
        });
        const content = document.createElement('full-content');
        const statInputsArray = [];
        const statInputsCont = document.createElement('stat-inputs');
        const btnsCont = document.createElement('buttons-container');
        const btnGoBack = new WUButton('Go Back', './img/icons/stats/retreat.svg', () => this.show(0, cw.currentItem));
        const btnContinue = new WUButton('Continue', './img/icons/stats/advance.svg', () =>
        {
            const item = cw.currentItem;

            for (let i = 0; i < statInputsArray.length; i++)
            {
                const statInput = statInputsArray[i];
                const value = statInput.getValue();

                if ((Array.isArray(value) && (value[0] || value[1])) || (!Array.isArray(value) && value)) item.stats[statInput.stat.name] = statInput.getValue();
            }

            if (item.type > 4)
            {
                //window.workshop.waitScreen.show();
                window.workshop.defineCustomItem(item, () =>
                {
                    //window.workshop.waitScreen.hide();
                    this.hide();
                    document.querySelector('wu-custom-items-tab').show();
                });
            }
            else this.show(2, item);
        });

        const statsData = window.workshop.statsData;
        const statNames = Object.keys(statsData);

        for (let i = 0; i < statNames.length; i++)
        {
            const stat = statsData[statNames[i]];
            const icon = $.dom('img', { src:stat.src });
            const statInput = $.dom('stat-input', {
                inputs: [],
                stat,
                oninput: function (e)
                {
                    if (this.inputs.length === 1)
                    {
                        const value = stat.type === 'num' ? Number(e.target.value) : e.target.checked;
                        if (value) cw.currentItem.stats[stat.name] = value;
                        else delete cw.currentItem.stats[stat.name];
                    }
                    else
                    {
                        const values = [Number(this.inputs[0].value), Number(this.inputs[1].value)];
                        if (values[0] || values[1]) cw.currentItem.stats[stat.name] = values;
                        else delete cw.currentItem.stats[stat.name];
                    }
                }
            });


            statInput.getValue = function ()
            {
                return this.stat.type === 'boo' ? Boolean(this.inputs[0].checked) : this.inputs.length > 1 ? [this.inputs[0].value, this.inputs[1].value] : this.inputs[0].value
            };


            statInput.appendChild(icon);

            if (stat.type === 'num')
            {
                const inputData = {
                    type: 'number',
                    placeholder: '0',
                };
                const input1 = $.dom('input', inputData);

                statInput.inputs.push(input1);
                statInput.appendChild(input1);

                if (stat.inputs > 1)
                {
                    const input2 = $.dom('input', inputData);

                    statInput.inputs.push(input2);
                    statInput.append('-');
                    statInput.appendChild(input2);
                }
            }
            else
            {
                const input = new WUSwitchButton();
                input.oninput = () => statInput.dispatchEvent(new Event('input'));

                statInput.inputs.push(input);
                statInput.appendChild(input);
            }

            statInput.append(stat.context);

            statInputsArray.push(statInput);
            statInputsCont.appendChild(statInput);
        }


        content.appendChild(statInputsCont);

        btnsCont.appendChild(btnGoBack);
        btnsCont.appendChild(btnContinue);

        content.appendChild(btnsCont);

        cw.appendChild(content);


        return cw;
    }
});

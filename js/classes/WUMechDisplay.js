class WUMechDisplay extends HTMLElement
{
    constructor (mech)
    {
        super();

        const zMap = { torso:4, leg1:5, leg2:3, side1:7, side2:0, side3:8, side4:1, top1:6, top2:2, drone:9 };

        this._scale    = $.getLS('main_mech_scale') || $.setLS('main_mech_scale', 70);
        this._partNames = Object.keys(zMap);
        this._parts     = [];

        this._partsContainer = $.dom('mech-parts');

        const scaleInput = $.dom('input',
        {
            type: 'range',
            min: 1,
            max: 100,
            value: (100 - 1) * (this.scale() / 100),
            oninput: e => this.adjust(Number(e.target.value)),
        });

        for (const name of this._partNames)
        {
            this._parts[name] = new MechPart();
            this._parts[name].style.zIndex = 100 + zMap[name];
            this._partsContainer.appendChild(this._parts[name]);
        }

        const partsContainerWrapper = $.dom('parts-container-wrapper');

        partsContainerWrapper.appendChild(this._partsContainer);

        this.appendChild(partsContainerWrapper);
        this.appendChild(scaleInput);

        mech && this.setup(mech.setup);

        window.addEventListener('resize', () => this.adjust());
    }

    scale (percent)
    {
        this._scale = percent || this._scale;
        this._partsContainer.style.transform = `scale(${ this._scale / 100 })`;
        this._partsContainer.style.bottom = (99 - this._scale) * -.5 + '%';
        $.setLS('main_mech_scale', this._scale);

        return this._scale;
    }

    setup (_setup)
    {
        if (!_setup[0]) return;

        const setup = [ ..._setup ];
        setup.splice(1, 0, _setup[1]);

        const partsArray     = Object.keys(this._parts).map(key => this._parts[key]);
        const onImagesLoaded = setInterval(() =>
        {
            if ($.arrayEvery(partsArray, function (part) { return part.itemGfx.complete }))
            {
                clearInterval(onImagesLoaded);
                this.adjust();
            }
        });

        for (let i = 0; i < partsArray.length; i++) partsArray[i].setItem(setup[i]);
    }

    adjust (scale)
    {
        this.scale(scale);

        if (this._parts.torso.style.visibility === 'hidden') return;

        const leg1  = this._parts.leg1;
        const torso = this._parts.torso;
        const drone = this._parts.drone;
        const skipAttachment = ['leg1', 'torso', 'drone'];

        if (leg1.style.visibility === 'hidden')
        {
            skipAttachment.push('leg2');

            torso.x = (this._partsContainer.offsetWidth - torso.w) / 2;
            torso.y = this._partsContainer.offsetHeight - torso.h;
        }
        else
        {
            leg1.x = (this._partsContainer.offsetWidth - leg1.w - (torso.attachment.leg2.x - torso.attachment.leg1.x)) / 2;
            leg1.y = this._partsContainer.offsetHeight - leg1.h;

            torso.x = leg1.offsetLeft + (leg1.attachment.x - torso.attachment.leg1.x);
            torso.y = leg1.offsetTop  + (leg1.attachment.y - torso.attachment.leg1.y);
        }

        drone.x = torso.offsetLeft - 50;
        drone.y = torso.offsetTop  - 125;

        for (const name of this._partNames)
        {
            const part = this._parts[name];

            if (skipAttachment.includes(name) || part.style.visibility === 'hidden') continue;

            part.x = torso.offsetLeft + torso.attachment[name].x - part.attachment.x;
            part.y = torso.offsetTop  + torso.attachment[name].y - part.attachment.y;
        }
    }
}
window.customElements.define('wu-mech-display', WUMechDisplay);

class MechPart extends HTMLElement
{
    constructor ()
    {
        super();

        this.style.visibility = 'hidden';
        this.attachment = null;
        this.itemGfx = $.dom('img', { className:'outline' });

        this.appendChild(this.itemGfx);
    }

    setItem (item)
    {
        if (!item)
        {
            this.clear();
            return;
        }

        this.itemGfx.src          = item.src;
        this.itemGfx.hoverData    = { item };
        this.itemGfx.style.width  = item.width  ? item.width  : '';
        this.itemGfx.style.height = item.height ? item.height : '';

        this.attachment = item.attachment || { x:0, y:0 };
        this.style.visibility = '';
    }

    clear ()
    {
        this.itemGfx.src       = '';
        this.itemGfx.hoverData = null;

        this.attachment        = null;
        this.style.visibility  = 'hidden';
    }

    set x (x) { this.style.left = Number(x) + 'px' }
    set y (y) { this.style.top  = Number(y) + 'px' }
    get x ()  { return Number(this.style.left.replace(/[^\d|.]/g, '')) }
    get y ()  { return Number(this.style.top.replace(/[^\d|.]/g,  '')) }
    get w ()  { return this.itemGfx.width  }
    get h ()  { return this.itemGfx.height }
}
window.customElements.define('mech-part', MechPart);

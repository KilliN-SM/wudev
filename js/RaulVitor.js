'use strict';

(function ()
{
    window.$ = {

    dom: (tag, data, style) =>
    {
        const elem = document.createElement(tag);

        if (data)
        {
            const props = Object.keys(data);
            for (let i = 0; i < props.length; i++) elem[props[i]] = data[props[i]];
        }

        return style ? this.css(elem, style) : elem;
    },

    css: function (elem, style)
    {
        const props = Object.keys(style);

        for (let i = 0; i < props.length; i++) elem.style[props[i]] = style[props[i]];

        return elem;
    },

    // Check if first argument equals any other argument
    eq: function () {
        for (let i = 1; i < arguments.length; i++) if (arguments[0] === arguments[i]) return true;
        return false;
    },

    // Set data to Local Storage
    setLS: (key, data) =>
    {
        localStorage.setItem(key, JSON.stringify(data));
        return data;
    },

    // Get data from Local Storage
    getLS: key => JSON.parse(localStorage.getItem(key)),

    // Get Blob
    getBlob: (url, callback) => fetch(url).then(response => response.blob()).then(blob => callback(URL.createObjectURL(blob))).catch(callback),

    // Get Base64
    toDataURL: (url, callback) => fetch(url)
        .then(res => res.blob())
        .then(blob => new Promise((resolve, reject) =>
        {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        }))
        .then(b64 => { callback(b64) }),

    Array: {
        every: function (array, f)
        {
            let i = 0;
            
            while (i < array.length)
            {
                if (!f(array[i])) return false;
                i++;
            }
            
            return true;
        },
        map: (array, f) =>
        {
            const final = [];
            for (let i = 0; i < array.length; i++) final.push(f(array[i]));
            return final;
        },
        reverse: array =>
        {
            const final = [];
            for (let i = array.length; i--;) final.push(array[i]);
            return final;
        },
        filter: function (array, f)
        {
            const final = [];

            for (let i = 0; i < array.length; i++) f(array[i]) && final.push(array[i]);

            return final;
        },
    },

    defineHTMLElement: function (a, b)
    {
        window[b.name] = b;
        window.customElements.define(a, b);
    },

    testImg: (src, callback) =>
    {
        const img = new Image();
        const test = () =>
        {
            if (img.naturalWidth && img.naturalHeight)
            {
                clearInterval(listener)
                callback(img);
            }
        };
        const listener = setInterval(test, 100);
        img.onerror = () =>
        {
            clearInterval(listener);
            callback(null);
        }
        img.src = src;
    },

    Math: {
        round: function (x)
        {
            const
                k = String(x).split('.'),
                a = Number(k[0]),
                b = Number(k[1]),
                c = Number('5' + '0'.repeat(b.length - 1));
            
            return b > c ? a + 1 : a;
        },
    },
    String: {
        repeat: function (str, times)
        {
            if (times < 1) return '';

            let final = '';

            while (times--) final += str;

            return final;
        },
    },

    appendAndRef: function (parent, name, child)
    {
        parent[name] = child;
        parent.appendChild(child);
    },

    /*

    // Check if the object is DOM :boolean
    isDOM: o => o && o instanceof Element || o instanceof Node,

    query: s => document.querySelector(s),
    queryAll: s => document.querySelectorAll(s),

    // Append child at specific index :void
    appendChildAt: (parent, child, index) => parent.insertBefore(child, parent.children[index]),

    // Get request :object
    getJSON: (src, callback) => fetch(src).then(r => r.json()).then(callback),

    getBlob: function getBlob (src, callback)
    {
        fetch(src)
            .then(function (response) { return response.blob() })
            .then(function (blob) { callback(URL.createObjectURL(blob)) })
            .catch(function () { callback() });
    },

    // Get Element boundries :object
    bound: elm => elm.getBoundingClientRect(),

    // Capitalize first leter of string :string
    capital: str => typeof str !== 'string' ? '' : str.charAt(0).toUpperCase() + str.slice(1),

    // Remove all childs from element
    empty: foo =>
    {
        let el;
        if (typeof foo === 'string') el = $.query(foo);
        else if ($.isDOM(foo)) el = foo;
        else return;
        while (el.lastChild) el.removeChild(el.lastChild);
        return el;
    },

    // Set element style
    css: (el, style) =>
    {
        if (!$.isDOM(el)) return;
        for (const key of Object.entries(style)) el.style[key[0]] = key[1];
    },

    easyEase: (obj, prop, value) =>
    {
        const thisEaseID = String(Math.random());

        obj._easeID = thisEaseID;
        obj._easing = true;
        obj[prop]   = Number(obj[prop]) || 0;

        const poll = setInterval(() =>
        {
            if (!obj._easing)
            {
                clearInterval(poll);
                delete obj._easing;
                delete obj._easeID;
            }
        }, 10);

        let need = value - Number(obj[prop]);
        let val  = Number(obj[prop]);

        const roll = () => setTimeout(f =>
        {
            const am = need * 0.25;
            need -= am;
            val = val + am;

            obj[prop] = Math.round(val);

            if (Math.round(need))
            {
                if (obj._easeID === thisEaseID) roll();
            }
            else obj._easing = false;
        }, 50);
        roll();
    },

    // Copy String to clipboard
    toClipboard: str => {
        const _ = $.DOM('textarea', null, { value: String(str) });
        document.body.appendChild(_);
        _.select();
        document.execCommand('copy');
        _.remove();
    },

    */
}
})();

/*

# Welcome to the divine stats thread
___
I noticed many players were asking for certain items' divine stats, so I decide to create a divine stats thread besides the maxed mythical thread, so players can find the stats quickly.
___

[details="Torso"]

[details="Physical Torso"]
```c
Avenger         (350) 1306 HP 200/64 Energy 150/48 Heat 16P/22Ex/22El Res
Interceptor     (309)  884 HP 200/56 Energy 275/80 Heat 16P/22Ex/22El Res
Archimonde      (363) 1152 HP 284/76 Energy 284/76 Heat 22P/22Ex/22El Res
Hollow S. Armor (370) 1678 HP 259/80 Energy 259/80 Heat    0P/0Ex/0El Res
Energy F. Armor (335)
Battery Armor   (360) 1284 HP 374/24 Energy 343/24 Heat 14P/14Ex/14El Res
```
[/details]

[details="Heat Torso"]
```c
Brutality      (341) 1070 HP 225/64 Energy  298/88 Heat 22P/16Ex/22El Res
Windigo        (345) 1017 HP 225/72 Energy 310/112 Heat 22P/16Ex/22El Res
Nightmare      (315)  910 HP 200/64 Energy  298/96 Heat 22P/16Ex/22El Res
Zarkares       (362) 1177 HP 200/64 Energy 321/112 Heat 16P/24Ex/16El Res
Sabertooth     (362) 1219 HP 207/64 Energy 329/112 Heat 16P/24Ex/16El Res
Molten P. Vest (346) 1054 HP 207/64 Energy  282/96 Heat 44P/16Ex/22El Res
F. Heat Armor  (370) 1786 HP 207/64 Energy  282/96 Heat    0P/0Ex/0El Res
Flame B. Armor
```
[/details]


[details="Energy Torso"]
```c
Grim Reaper       (329)  910 HP 356/112 Energy 200/64 Heat 22P/22Ex/16El Res
Sith              ()
Naga              (335) 1017 HP 287/104 Energy 200/72 Heat 22P/22Ex/16El Res
Lightning P. Vest (346) 1054 HP  282/96 Energy 207/64 Heat 44P/22Ex/16El Res
Rust Energy Armor (370) 1786 HP  282/96 Energy 207/64 Heat    0P/0Ex/0El Res
```
[/details]

[/details]
[details="Leg"]

[details="Physical Leg"]
```c
Iron Boots     (138) 491 HP 167-219 Dmg 1 Push 1 Walk 2 Jump
Grave Digger   ()
The Claw       (150) 909 HP  83-117 Dmg 
Rolling Beasts (134) 476 HP 169-255 Dmg 1 Push 3 Walk
```
[/details]

[details="Heat Leg"]
```c
Dynamite Boots (136) 428 HP 136-229 Dmg 30 Heat Dmg 2 Push 1 Walk 2 Jump
Devouring Paws (119) 408 HP 144-227 Dmg 45 Heat Dmg 1 Push 1 Walk 2 Jump
Scorching Feet (120) 428 HP 147-192 Dmg 37 Heat Dmg 1 Push 1 Walk 2 Jump
```
[/details]
[details="Energy Leg"]
Lightning Supporters (124) 428 HP 131-197 Ele Dmg 69 Energy Dmg 1 Knockback 1 Walking
2 Jumping
Dynamite Stompers (118) 386 HP 158-223 Ele Dmg 60 Energy Dmg 1 Knockback 1 Walking
2 Jumping
Sparked Runners (114) 389 HP 143-264 Ele Dmg 41 Energy Dmg 1 Knockback 3 Walking
Charged Feet
Recoil Stompers

[/details]

[/details]
(I'll finish the weapons category later)

---
Feel free for adding the missing item's stats
-
*/
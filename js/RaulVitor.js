'use strict';

(function ()
{
    window.$ = {

    // Create DOM element
    dom: (tag, objData, nodeData) =>
    {
        const div = document.createElement('div');
        div.innerHTML = `<${tag}>`;

        if (nodeData) Object.keys(nodeData).map(k => div.lastChild.setAttribute(k, nodeData[k]));
        if (objData) Object.keys(objData).map(k => div.lastChild[k] = objData[k]);

        return div.lastChild;
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
    
    css: function (element, style) {
        const properties = Object.keys(style);
        for (const p of properties) {
            element.style[p] = style[p];
        }
        return element;
    },

    arrayEvery: function (array, test)
    {
        let i = 0;
        
        while (i < array.length)
        {
            if (!test(array[i])) return false;
            i++;
        }
        
        return true;
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

    // Test if image src is valid and callbacks the image if it is :(DOM || undefined)
    testImg: (src, callback) =>
    {
        const img = new Image();
        const test = () => img.naturalWidth && img.naturalHeight && !clearInterval(listener) && callback(img);
        const listener = setInterval(test, 10);
        img.onerror = () => clearInterval(listener) || callback();
        img.src = src;
    },

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

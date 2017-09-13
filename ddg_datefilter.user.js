// ==UserScript==
// @name           ddg-datafilter
// @namespace      fluks
// @description    Add date filters to ddg.
// @version        0.1.0
// @include        https://duckduckgo.com/html*
// @author         fluks
// ==/UserScript==

const filter = (e) => {
    const value = e.target.value;
    const query = document.querySelector('#search_form_input_homepage').value;

    const search = '?q=' + query + '&df=' + (value || '');
    let url = document.location.href;
    url = url.replace(/(\/?\?.*|\/)$/, search);

    document.location.assign(url);
};

const addFilter = (e) => {
    const options = [
        { name: 'Any Time',   value: ''  },
        { name: 'Past Day',   value: 'd' },
        { name: 'Past Week',  value: 'w' },
        { name: 'Past Month', value: 'm' },
    ];

    const m = document.location.href.match(/(?:\?.*df=([^&]*))/);
    const dateFilter = m ? m[1] : '';

    const select = document.createElement('select');

    options.forEach(o => {
        const option = document.createElement('option');
        option.textContent = o.name;
        option.value = o.value;
        if (o.value === dateFilter)
            option.selected = true;

        select.appendChild(option);
    });

    select.addEventListener('change', filter);

    document.querySelector('#header').appendChild(select);
};

document.addEventListener('DOMContentLoaded', addFilter);

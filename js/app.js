'use strict';

const app = document.querySelector('app');


const loading = $.dom('loading-text', { innerText:'Loading...' });

app.appendChild(loading);


const workshop = new WUWorkshop();

workshop.style.opacity = '0';
workshop.style.visibility = 'hidden';

app.appendChild(workshop);


const onEverythingReady = setInterval(() =>
{
    if (!workshop.ready || document.readyState !== 'complete') return;
    
    clearInterval(onEverythingReady);

    loading.innerText = 'Welcome';

    setTimeout(() =>
    {
        loading.remove();
        workshop.style.opacity = '1';
        workshop.style.visibility = 'visible';
    }, 2000);
});

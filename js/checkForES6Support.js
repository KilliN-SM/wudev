try
{
    // Summon Fatty Arrow Boi
    new Function('(x = 0) => x');


    // Code below only runs if Fat Arrow (ES6 Function) is supported

    const DOC = document;
    const app = DOC.createElement('app');
    const js  = DOC.createElement('script');

    js.src = 'js/app.js';

    DOC.body.appendChild(app);
    DOC.body.appendChild(js);

    console.log('EcmaScript6 supported, Workshop Unlimited is being initialized.');
    

    // Delete this script from the document
    DOC.getElementById('cfes6s').remove();
}
catch (x)
{
    // Code below only runs if ES6 is NOT supported

    var err = 'No EcmaScript6 Support! Workshop Unlimited will not work.';

    document.body.innerText = err;

    console.error(err);
}

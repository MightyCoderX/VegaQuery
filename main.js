import { $, $$, $id, $new, $svg } from './vega-query.js';

$$`a`.on('click', e =>
{
    e.preventDefault();
    $('body').toggleClass('red');
});

$('body').append($svg('svg', { width: 100, height: 100 }));

$('body').append($new('a', { href: '#' }).text('a'));

$id('btnClickMe').on('click', e => console.log(e));

$$('a').style({
    color: 'red'
});

$$('a').click();

$('body').append($new('canvas', { width: 200, height: 200 }).addClass('canvas'));

$('body').append($new('p', { style: {
    color: 'red'
}}).html('<img>'));

console.log($$`h1, p, a`.elements);

$`p`.addClass`text`

import { $, $$, $id, $new, $svg } from './vega-query.js';

$$('a').on('click', e =>
{
    e.preventDefault();
    $('body').toggleClass('red');
    
    console.log($$`p`.toggleClass('par'));
});

$('body').append($svg('svg', { width: 100, height: 100 }));

$('body').append($new('a', { href: '#' }).text('a'));

$id('btnClickMe').on('click', e => console.log(e));

$$('a').style({
    color: 'red'
}).attr({
    style: {
        textDecoration: 'none'
    }
});

$$('a').on('click keydown', console.log);

// $('body').append($new('canvas', { width: 200, height: 200 }).addClass('canvas'));

console.log($$`h1, p, a`.elements);

console.log($$('textarea').text('Hello'));
console.log($$('h1').html());

$$('a').prepend('> ').append(';');

$('body').append($svg('svg', { width: 100, height: 100, style: {
    scale: 2
}}).append($svg('path', { d: 'M 20 30 L 50 60', stroke: '#222', fill: 'red' })));
$('path').attr({ d: 'M 10 10 L 30 30 L 20 40 Z' });

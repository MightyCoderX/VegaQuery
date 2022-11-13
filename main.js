import { $, $new, $svg } from './vega-query.js';

$('a').on('click', e =>
{
    e.preventDefault();
});

$('body').append($svg('svg', { width: 100, height: 100 }));

$('body').append($new('a', { href: '#' }).text('a'));
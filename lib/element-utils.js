/**
 * @template {ElementCSSInlineStyle} E
 * 
 * @param {E} elem
 * @param {Record<keyof CSSStyleDeclaration, any>} styles
 */
export function setStyles(elem, styles)
{
    for(const property in styles)
    {
        elem.style[property] = styles[property];
    }
}

/**
 * @param {Element} elem
 * @param {Record<string, any> | { style: Record<keyof CSSStyleDeclaration, any> }} attributes 
 */
export function setAttributes(elem, attributes)
{
    for(const key in attributes)
    {
        if(key === 'style' && typeof attributes[key] === 'object' && 'style' in elem)
        {
            setStyles(elem, attributes[key]);
            continue;
        }

        elem.setAttributeNS(null, key, attributes[key]);
    }
}
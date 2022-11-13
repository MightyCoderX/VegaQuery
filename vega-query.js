/**
 * Alias for ParentNode.querySelector
 * 
 * @template {keyof HTMLElementTagNameMap} K
 * 
 * @param {K} selectors The selectors
 * 
 * @param {ParentNode} parent 
 * 
 * @returns {VQElement<HTMLElementTagNameMap[K]>}
 */
export function $(selectors, parent = document)
{
    return new VQElement(parent.querySelector(selectors));
}

/**
 * Alias for document.getElementById
 * 
 * @param {string} elementId 
 * 
 * @returns {VQElement<HTMLElement>}
 */
export function $id(elementId)
{
    return new VQElement(document.getElementById(elementId));
}

/**
 * Alias for ParentNode.querySelectorAll
 * 
 * @param {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | 
 *  keyof HTMLElementDeprecatedTagNameMap} selectors 
 * 
 * @param {ParentNode} parent 
 * 
 * @returns {VQElements}
 */
export function $$(selectors, parent = document)
{
    return new VQElements([...parent.querySelectorAll(selectors)]);
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * 
 * @param {K} tagName 
 * @param {Record<string, any>} attributes
 * @param {ElementCreationOptions} options 
 * @returns {VQElement<HTMLElementTagNameMap[K]>}
 */
export function $new(tagName, attributes, options)
{
    const elem = document.createElement(tagName, options);

    setAttributes(elem, attributes);

    return new VQElement(elem);
}

/**
 * @template {keyof SVGElementTagNameMap} K
 * 
 * @param {K} qualifiedName 
 * @param {Record<string, any>} attributes
 * @returns {VQElement<SVGElementTagNameMap[K]>}
 */
export function $svg(qualifiedName, attributes)
{
    const svgElem = document.createElementNS('http://www.w3.org/2000/svg', qualifiedName);

    setAttributes(svgElem, attributes);

    return new VQElement(svgElem);
}

/**
 * @param {keyof HTMLElementTagNameMap} selectors
 * @param {Record<keyof CSSStyleDeclaration, any>} styles 
 */
export function $style(selectors, styles)
{
    return $$(selectors).style(styles);
}

/**
 * @param {ElementCSSInlineStyle} elem
 * @param {Record<keyof CSSStyleDeclaration, any>} styles
 */
function setStyles(elem, styles)
{
    for(const property in styles)
    {
        elem.style[property] = styles[property];
    }
}

/**
 * @param {Element} elem 
 * @param {Record<string, any>} attributes 
 */
function setAttributes(elem, attributes)
{
    for(const key in attributes)
    {
        if(key === 'style' && typeof attributes[key] === 'object')
        {
            setStyles(elem, attributes[key]);
            continue;
        }
        elem.setAttributeNS(null, key, attributes[key]);
    }
}

/**
 * @template {Element} E
 */
class VQElement
{
    /**
     * @type {E}
     */
    element;

    /**
     * @param {E} element 
     */
    constructor(element)
    {
        this.element = element;
    }

    click()
    {
        this.element.click();
        return this;
    }

    text(txt)
    {
        if(txt)
        {
            this.element.textContent = txt;
            return this;
        }
        else
        {
            return this.element.textContent;
        }
    }

    html(html)
    {
        if(html)
        {
            this.element.innerHTML = html;
            return this;
        }
        else
        {
            return this.element.innerHTML;
        }
    }

    /**
     * Alias for addEventListener
     * 
     * @template {keyof GlobalEventHandlersEventMap} K
     * 
     * @param {K} type 
     * @param {(this: E, ev: GlobalEventHandlersEventMap[K]) => any} listener 
     * @param {boolean | AddEventListenerOptions} options 
     */
    on(type, listener, options)
    {
        this.element.addEventListener(type, listener, options);
        return this;
    }

    /**
     * Alias for removeEventListener
     * 
     * @template {keyof GlobalEventHandlersEventMap} K
     * 
     * @param {K} type 
     * @param {(this: E, ev: GlobalEventHandlersEventMap[K]) => any} listener 
     * @param {boolean | EventListenerOptions} options
     */
    off(type, listener, options)
    {
        this.element.removeEventListener(type, listener, options);
        return this;
    }

    /**
     * @param  {(Node | string)[]} nodes 
     */
    append(...nodes)
    {
        this.element.append(...nodes.map(n => n instanceof VQElement ? n.element : n));
        return this;
    }
    
    /**
     * @param  {(Node | string)[]} nodes 
     */
    prepend(...nodes)
    {
        this.element.prepend(...nodes.map(n => n instanceof VQElement ? n.element : n));
        return this;
    }

    /**
     * @param {Record<keyof CSSStyleDeclaration, any>} styles
     */
    style(styles)
    {
        setStyles(this.element, styles);

        return this;
    }

    /**
     * @param  {string[]} tokens 
     */
    addClass(...tokens)
    {
        this.element.classList.add(...tokens);
        return this;
    }

    /**
     * @param  {string[]} tokens 
     */
    removeClass(...tokens)
    {
        this.element.classList.remove(...tokens);
        return this;
    }

    /**
     * @param {string} token 
     * @param {boolean} force 
     */
    toggleClass(token, force)
    {
        return this.element.classList.toggle(token, force);
    }

    /**
     * @param {string} token
     */
    hasClass(token)
    {
        return this.element.classList.contains(token)
    }
}

class VQElements
{
    /**
     * @type {Element[]}
     */
    elements;

    /**
     * @param {Element[]} elements 
     */
    constructor(elements)
    {
        this.elements = elements;
    }

    /**
     * @param {Record<keyof CSSStyleDeclaration, any>} styles
     */
    style(styles)
    {
        this.elements.forEach(elem =>
        {
            setStyles(elem, styles);
        });

        return this;
    }

    /**
     * Add event listeners to all elements
     * 
     * @template {keyof ElementEventMap} K
     * 
     * @param {K} type 
     * @param {(this: Element, ev: ElementEventMap[K]) => any} listener 
     * @param {boolean | AddEventListenerOptions} options 
     */
    on(type, listener, options)
    {
        this.elements.forEach(elem => elem.addEventListener(type, listener, options));
        return this;
    }

    /**
     * Remove event listeners from all elements
     * 
     * @template {keyof ElementEventMap} K
     * 
     * @param {K} type 
     * @param {(this: Element, ev: ElementEventMap[K]) => any} listener 
     * @param {boolean | EventListenerOptions} options
     */
    off(type, listener, options)
    {
        this.elements.forEach(elem => elem.removeEventListener(type, listener, options));
        return this;
    }

    click()
    {
        this.elements.forEach(elem => elem.click());
        return this;
    }
}
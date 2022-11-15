/**
 * Alias for ParentNode.querySelector
 * 
 * @template {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap} K
 * 
 * @param {K} selectors The selectors
 * 
 * @param {ParentNode} parent? 
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
 * @param {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap} selectors 
 * 
 * @param {ParentNode} parent? 
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
 * @param {Record<string, any> | { style: Record<keyof CSSStyleDeclaration, any> }} attributes?
 * @param {ElementCreationOptions} options? 
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
 * @param {Record<string, any> | { style: Record<keyof CSSStyleDeclaration, any> }} attributes?
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
 * @template {ElementCSSInlineStyle} E
 * 
 * @param {E} elem
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
 * @param {Record<string, any> | { style: Record<keyof CSSStyleDeclaration, any> }} attributes 
 */
function setAttributes(elem, attributes)
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

    /**
     * @param {string} txt?
     */
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

    /**
     * @param {string} html? 
     */
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
     * @param {Record<string, any> | { style: Record<keyof CSSStyleDeclaration, any> }} attributes 
     */
    attr(attributes)
    {
        setAttributes(this.element, attributes);
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
     * Alias for addEventListener
     * 
     * @template {keyof GlobalEventHandlersEventMap} K
     * 
     * @param {K} names 
     * @param {(this: E, ev: GlobalEventHandlersEventMap[K]) => any} listener 
     * @param {boolean | AddEventListenerOptions} options 
     */
    on(names, listener, options)
    {
        names.split(' ').forEach(name =>
        {
            this.element.addEventListener(name, listener, options);
        })
        return this;
    }

    /**
     * Alias for removeEventListener
     * 
     * @template {keyof GlobalEventHandlersEventMap} K
     * 
     * @param {K} names 
     * @param {(this: E, ev: GlobalEventHandlersEventMap[K]) => any} listener 
     * @param {boolean | EventListenerOptions} options
     */
    off(names, listener, options)
    {
        names.split(' ').forEach(name =>
        {
            this.element.removeEventListener(name, listener, options);
        })
        return this;
    }

    click()
    {
        this.element.click();
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
     * @type {VQElement[]}
     */
    elements;

    /**
     * @param {Element[]} elements 
     */
    constructor(elements)
    {
        this.elements = elements.map(el => new VQElement(el));
    }

    /**
     * 
     * @param {string} txt? 
     * @returns 
     */
    text(txt)
    {
        const res = this.elements.map(el => el.text(txt));

        if(res.every(el => el instanceof VQElement))
        {
            return new VQElements(res);
        }
        else
        {
            return res;
        }
    }

    /**
     * 
     * @param {string} html? 
     * @returns 
     */
    html(html)
    {
        const res = this.elements.map(el => el.html(html));

        if(res.every(el => el instanceof VQElement))
        {
            return new VQElements(res);
        }
        else
        {
            return res;
        }
    }

    /**
     * @param {Record<string, any> | { style: Record<keyof CSSStyleDeclaration, any> }} attributes 
     */
    attr(attributes)
    {
        this.elements.forEach(elem => elem.attr(attributes));
        return this;
    }

    /**
     * @param {Record<keyof CSSStyleDeclaration, any>} styles
     */
    style(styles)
    {
        this.elements.forEach(elem =>elem.style(styles));
        return this;
    }

    /**
     * Add event listeners to all elements
     * 
     * @template {keyof GlobalEventHandlersEventMap} K
     * 
     * @param {K} names 
     * @param {(this: Element, ev: GlobalEventHandlersEventMap[K]) => any} listener 
     * @param {boolean | AddEventListenerOptions} options 
     */
    on(names, listener, options)
    {
        this.elements.forEach(elem => elem.on(names, listener, options));
        return this;
    }

    /**
     * Remove event listeners from all elements
     * 
     * @template {keyof GlobalEventHandlersEventMap} K
     * 
     * @param {K} names 
     * @param {(this: Element, ev: GlobalEventHandlersEventMap[K]) => any} listener 
     * @param {boolean | EventListenerOptions} options
     */
    off(names, listener, options)
    {
        this.elements.forEach(el => el.off(names, listener, options));
        return this;
    }

    click()
    {
        this.elements.forEach(el => el.click());
        return this;
    }

    /**
     * @param  {(Node | string)[]} nodes 
     */
    append(...nodes)
    {
        this.elements.forEach(el => el.append(...nodes));
        return this;
    }
    
    /**
     * @param  {(Node | string)[]} nodes 
     */
    prepend(...nodes)
    {
        this.elements.forEach(el => el.prepend(...nodes));
        return this;
    }
    
    /**
     * @param  {string[]} tokens 
     */
    addClass(...tokens)
    {
        this.elements.forEach(el => el.addClass(...tokens));
        return this;
    }

    /**
     * @param  {string[]} tokens 
     */
    removeClass(...tokens)
    {
        this.elements.forEach(el => el.removeClass(...tokens));
        return this;
    }

    /**
     * @param {string} token 
     * @param {boolean} force 
     */
    toggleClass(token, force)
    {
        return this.elements
            .map(el => el.toggleClass(token, force))
            .every(toggled => toggled);
    }
}
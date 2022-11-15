import VQElement from './VQElement.js';

export default class VQElements
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
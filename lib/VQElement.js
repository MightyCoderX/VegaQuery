import { setAttributes, setStyles } from './element-utils.js';

/**
 * @template {Element} E
 */
export default class VQElement
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
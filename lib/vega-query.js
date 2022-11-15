import VQElement from './VQElement.js';
import VQElements from './VQElements.js';
import { setAttributes } from './element-utils.js';

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




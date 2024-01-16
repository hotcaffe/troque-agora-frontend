function setCustomCSS(css: any, selector?: {selectorIndex: number, index: number}) {
    if (selector) {
        const {selectorIndex, index} = selector;
        const {selected, unselected, default: regular} = css;
        return {...(selectorIndex == index ? {...regular, ...selected} : {...regular, ...unselected})}
    }
    return {...css.default}
}

export {setCustomCSS}
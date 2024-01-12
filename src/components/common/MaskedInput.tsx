import { IMaskInput } from "react-imask";
import {FocusEvent, createRef, forwardRef} from 'react'
import { Input, InputProps } from "@chakra-ui/react";

export interface IMaskedInput extends InputProps{
    onChange: (event: {target: {name: string; value: string}}) => void;
    name: string,
    mask: any,
}
    
const MaskedInput = forwardRef<HTMLInputElement, IMaskedInput>((props, inputRef) => {
    const {onChange, mask, ...rest} = props;
    const ref = createRef();
    let inputUnmaskedValue: string;

    return (
        <Input as={IMaskInput} inputRef={inputRef} ref={ref} {...rest} mask={mask} 
            onAccept={(value: any, {_unmaskedValue}: any) => {
                inputUnmaskedValue = _unmaskedValue;
                onChange({target: {name: rest.name, value: inputUnmaskedValue}})
            }}
            onBlur={(e) => {
                onChange({target: {name: rest.name, value: inputUnmaskedValue}});
            }}
        />
    )
})

export {MaskedInput}
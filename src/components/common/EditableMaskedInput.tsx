import { Flex, IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FormInput } from "./FormInput";
import { IMaskedInput, MaskedInput } from "./MaskedInput";
import { EditableControls } from "./EditableControls";
import { Edit } from "react-feather";
import { FocusEvent, MutableRefObject, forwardRef, useEffect, useRef, useState } from "react";

interface IEditableMaskedInput extends IMaskedInput{
    defaultValue: string;
}

const EditableMaskedInput = forwardRef<HTMLInputElement, IEditableMaskedInput>((props, inputRef) => {
    const {defaultValue, name, ...rest} = props;
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState('')
    const ref = useRef<HTMLInputElement>(null);

    function onConfirm() {
        setIsEditing(false);
    }

    function onCancel() {
        if (ref.current) ref.current.value = tempValue 
        setIsEditing(false);
    }

    function changeEditing(isEditing: boolean) {
        setIsEditing(isEditing)
    }

    function onBlur(e: FocusEvent<HTMLInputElement, Element>) {
        if (e.relatedTarget?.getAttribute('name') == name) return;
        e.target.value = tempValue
        setIsEditing(false)
    }

    useEffect(() => {
        if (ref.current) setTempValue(ref.current.value)
    }, [])

    useEffect(() => {
        if (ref.current) setTempValue(ref.current.value)
    }, [ref.current?.value])

    useEffect(() => {
        if (isEditing) {
            if (ref.current) {
                ref.current.focus();
                ref.current.select();
            }
        }
    }, [isEditing])

    return (
        <Flex flexDirection={isEditing ? "column" : "row"} align={isEditing ? "start" : "center"} onBlur={onBlur}>
            <MaskedInput 
                ref={ref}
                name={name}
                paddingX={isEditing ? "16px" : "0px"}
                border={isEditing ? "2px solid" : "none"}
                borderColor="teal.300"
                placeholder="Digite o valor"
                defaultValue={defaultValue}
                isDisabled={!isEditing}
                cursor={isEditing ? "text" : "default !important"}
                {...rest}
            />
            <EditableControls name={name} onConfirm={onConfirm} onCancel={onCancel} isEditing={isEditing} changeEditing={changeEditing}/>
        </Flex>
    )
})

export {EditableMaskedInput}
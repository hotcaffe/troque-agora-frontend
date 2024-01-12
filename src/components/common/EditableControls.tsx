import { ButtonGroup, Icon, IconButton, useEditableControls } from "@chakra-ui/react"
import { useState } from "react"
import { Check, Edit, X } from "react-feather"

interface IEditableControls {
    name: string;
    onConfirm: () => void;
    onCancel: () => void;
    changeEditing: (value: boolean) => void;
    isEditing: boolean;
}

export function EditableControls({name, onConfirm, onCancel, changeEditing, isEditing}: IEditableControls) {

    function onConfirmClick() {
        changeEditing(false)
        onConfirm()
    }

    return isEditing ? 
        (
            <ButtonGroup w="100%" mt="5px" justifyContent="start">
                <IconButton name={name} h="30px" icon={<Icon w="20px" h="20px" as={Check}/>} aria-label="Confirmar" onClick={onConfirm}/>
                <IconButton name={name} variant="secondary" h="30px" icon={<Icon w="20px" h="20px" as={X}/>} aria-label="Cancelar" onClick={onCancel}/>
            </ButtonGroup> 
        ) :
        (
            <IconButton ml="10px" h="30px" w="30px" size="sm" icon={<Icon w="20px" h="20px" as={Edit}/>} aria-label="Editar" 
                onClick={() => changeEditing(true)}
            />
        )
}
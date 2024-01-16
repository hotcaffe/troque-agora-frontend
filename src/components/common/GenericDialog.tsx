import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { RefObject, cloneElement, useRef } from "react";

interface IGenericDialog {
    children: JSX.Element;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

export function GenericDialog({children, isOpen, onOpen, onClose, onConfirm, title, description}: IGenericDialog) {
    const cancelRef = useRef<any>();
    
    return (
        <>
            {cloneElement(children, {onClick: onOpen})}

            <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontWeight="bold">{title}</AlertDialogHeader>
                        <AlertDialogBody>{description}</AlertDialogBody>
                        <AlertDialogFooter gap="5px">
                            <Button ref={cancelRef} onClick={onClose} variant="secondary">Cancelar</Button>
                            <Button colorScheme="ref" onClick={onConfirm}>Confirmar</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
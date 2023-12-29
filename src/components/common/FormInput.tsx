import { FormControl, FormLabel, Input, FormErrorMessage, FormControlProps, Text, Box, HStack, Flex } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

interface IFormInput extends FormControlProps{
    title: string;
    error: any;
    man?: boolean;
    children: JSX.Element;
}

export function FormInput({title, error, man, children, ...rest}: IFormInput) {
    return (
        <FormControl isInvalid={!!error} {...rest}>
            <FormLabel color="teal.300">{man ? (<Flex>{title}<Text color="red.400">*</Text></Flex>) : <>{title}</>}</FormLabel>
            {children}
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
}
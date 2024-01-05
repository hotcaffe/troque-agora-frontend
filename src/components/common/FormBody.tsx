import { Divider, Flex,  Heading, StackProps, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
interface IFormBody extends StackProps{
    children: ReactNode;
    title: string;
    titleDivider?: boolean;
    column?: boolean;
}

export function FormBody({children, title, titleDivider, column, ...rest}: IFormBody) {
    return (
        <VStack {...rest}>
            <Heading fontSize="lg" color="teal.700" fontWeight="semibold" w="100%" mb="4px">
                {title}
            </Heading>
            {titleDivider && <Divider borderWidth="2px" borderColor="teal.300" my="10px"/>}
            <Flex w="100%" wrap="wrap" gap="10px" align="flex-start" direction={column ? "column" : "row"}>
                {children}
            </Flex>
        </VStack>
    )
}
import { As, ComponentWithAs, Icon, IconProps } from "@chakra-ui/react";

interface IInterfactionIcon extends IconProps {
    as: As
}

export function InteractionIcon({as, ...rest}: IInterfactionIcon) {
    return <Icon as={as} w="24px" h="24px" color="gray.400" cursor="pointer" _hover={{color: "teal.800"}} {...rest}/>
}
import { As, Center, CenterProps, Icon, Text } from "@chakra-ui/react";

interface IFilterCard extends CenterProps{
    icon: As;
    title: string;
    onClick: () => void;
}

export function FilterCard({icon, title, onClick, ...rest}: IFilterCard) {
    return (
        <Center w="60px" h="60px" flexDirection="column" rounded="10px" cursor="pointer" 
            _hover={{filter: 'brightness(0.9)'}} onClick={onClick} {...rest}
        >
            <Icon as={icon}/>
            <Text fontSize="12px" fontWeight="semibold">{title}</Text>
        </Center>
    )
}
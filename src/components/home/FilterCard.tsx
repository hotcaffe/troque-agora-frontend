import { As, Center, Icon, Text } from "@chakra-ui/react";

interface IFilterCard {
    icon: As;
    title: string;
    onClick: () => void;
}

export function FilterCard({icon, title, onClick}: IFilterCard) {
    return (
        <Center w="60px" h="60px" flexDirection="column" rounded="10px" bg="white" color="teal.800" cursor="pointer" 
            _hover={{filter: 'brightness(0.9)'}} onClick={onClick} 
        >
            <Icon as={icon}/>
            <Text fontSize="12px" fontWeight="semibold">{title}</Text>
        </Center>
    )
}
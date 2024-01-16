import { Checkbox, Divider, HStack, Heading, Icon, Input, InputGroup, InputLeftElement, Text, VStack } from "@chakra-ui/react";
import { IProposalData } from "@/components/proposal/interfaces/proposal";
import { Search } from "react-feather";
import { ProposalCard } from "./ProposalCard";
import { useState } from "react";

interface IProposalList {
    title: string;
    list: IProposalData[]
}

export function ProposalList({title, list}: IProposalList) {
    const [stateList, setStateList] = useState(list);
    const [showCanceled, setShowCanceled] = useState(false);
    function onSearch(search: string) {
        setStateList(_ => list.filter(proposal => proposal.vc_titulo.includes(search)))
    }

    return (
        <VStack w="420px" gap="15px" bg="white">
            <VStack align="start" gap="5px" w="100%">
                <HStack justify="space-between" w="100%" gap="30px">
                    <Text color="teal.800" fontSize="18px" fontWeight="semibold">{title}</Text>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <Icon as={Search}/>
                        </InputLeftElement>
                        <Input type='text' placeholder='Pesquisar por trocas ativas' onChange={(e) => onSearch(e.target.value)}/>
                    </InputGroup>
                </HStack>
                <Checkbox fontSize="10px" onChange={(e) => setShowCanceled(e.target?.checked)}>Mostrar canceladas?</Checkbox>
            </VStack>
            <Divider borderColor="teal.300" w="100%" borderWidth="2px" opacity={1}/>
            <VStack mt="10px" overflowY="scroll" p="5px" maxH="780px" gap="15px">
                {(showCanceled ? stateList : stateList.filter(proposal => proposal.bo_ativo)).map(proposal => (
                    <ProposalCard key={`${proposal.id_usuarioProposta}-${proposal.id_propostaTroca}`} data={proposal}/>
                ))}
            </VStack>
        </VStack>
    )
}
import { Checkbox, Divider, HStack, Icon, Input, InputGroup, InputLeftElement, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { INoticeProposalFull, IProposalData } from "@/interfaces/proposal";
import { Search } from "react-feather";
import { ProposalCard } from "./ProposalCard";
import { useState } from "react";
import { ProposalModal } from "./ProposalModal";

interface IProposalList {
    title: string;
    list: INoticeProposalFull[];
    owner?: boolean;
    refetch: () => void;
}

export function ProposalList({title, list, owner, refetch}: IProposalList) {
    const [stateList, setStateList] = useState(list);
    const [showCanceled, setShowCanceled] = useState(false);
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [selected, setSelected] = useState<INoticeProposalFull>();
    
    function onSearch(search: string) {
        setStateList(_ => list.filter(proposalNotice => proposalNotice.proposal.vc_titulo.includes(search)))
    }

    function handleModal(proposal: INoticeProposalFull) {
        setSelected(proposal);
        onOpen()
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
            <VStack mt="10px" overflowY="scroll" p="5px" maxH="780px" gap="15px" pr="15px">
                {(showCanceled ? stateList : stateList.filter(proposalNotice => proposalNotice.proposal.bo_ativo)).map(proposalNotice => (
                    <ProposalCard 
                        key={`${proposalNotice.id_usuarioProposta}-${proposalNotice.id_propostaTroca}-${proposalNotice.id_usuarioAnuncio}-${proposalNotice.id_anuncioTroca}`} 
                        data={proposalNotice}
                        onOpen={handleModal}
                    />
                ))}
            </VStack>
            {selected && <ProposalModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} proposalNotice={selected} owner={owner} refetch={refetch}/>}
        </VStack>
    )
}
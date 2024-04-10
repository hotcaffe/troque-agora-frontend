import { SimpleStateList } from "@/components/common/SimpleStateList";
import { INoticeProposalFull } from "@/interfaces/proposal";
import { api } from "@/utils/api";
import { Badge, Button, ButtonGroup, Divider, HStack, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Td, Text, Tr, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { useRef } from "react";

interface IProposalModal {
    proposalNotice: INoticeProposalFull
    owner?: boolean;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    refetch: () => void;
}

const Status = {
    "pending": <Badge ml="10px" colorScheme="yellow">Pendente</Badge>,
    "rejected": <Badge ml="10px" colorScheme="purple">Rejeitado</Badge>,
    "canceled": <Badge ml="10px" colorScheme="red">Cancelado</Badge>,
    "accepted": <Badge ml="10px" colorScheme="teal">Aceitado</Badge>,
    "finished": <Badge ml="10px" colorScheme="green">Finalizado</Badge>
};

export function ProposalModal({owner, isOpen, onClose, onOpen, proposalNotice, refetch}: IProposalModal) {
    const ref = useRef(null);
    const toast = useToast({
        position: 'top-right',
        colorScheme: 'green'
    });

    const {proposal, vc_status, id_propostaTroca, id_anuncioTroca, id_usuarioProposta} = proposalNotice;

    async function onCancel() {
        if (["rejected", "accepted", "finished", "canceled"].includes(vc_status)) return;

        try {
            await api.patch("/proposal/cancel", undefined, {
                params: {
                    id_propostaTroca: id_propostaTroca
                }
            });
            toast({
                title: 'Proposta cancelada com sucesso!'
            });
            onClose();
        } catch {
            return;
        } finally {
            refetch()
        }
    }

    async function onAccept() {
        if (["rejected", "accepted", "finished", "canceled"].includes(vc_status)) return;

        try {
            await api.patch("/proposal/accept", undefined, {
                params: {
                    id_propostaTroca,
                    id_anuncioTroca,
                    id_usuarioProposta
                }
            });
            toast({
                title: 'Proposta aceita com sucesso!'
            });
            onClose();
        } catch {
            return;
        } finally {
            refetch()
        }
    }

    async function onReject() {
        if (["rejected", "accepted", "finished", "canceled"].includes(vc_status)) return;

        try {
            await api.patch("/proposal/reject", undefined, {
                params: {
                    id_propostaTroca,
                    id_anuncioTroca,
                    id_usuarioProposta
                }
            });
            toast({
                title: 'Proposta rejeitada com sucesso!'
            });
            onClose();
        } catch {
            return;
        } finally {
            refetch()
        }
    }

    return (
        <Modal finalFocusRef={ref} isOpen={isOpen} onClose={onClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {proposalNotice.proposal.vc_titulo}
                    {Status[vc_status]}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody minW="100%" maxW="100%">
                    <HStack whiteSpace="wrap" gap="20px">
                        <VStack justify="start" align="start" gap="1px" minW="200px">
                            <Text fontSize="12px" color="gray.400" fontWeight="semibold">Título</Text>
                            <Text fontSize="18px" color="gray.800">{proposal.vc_titulo}</Text>
                        </VStack>
                        <VStack justify="start" align="start" gap="1px" minW="200px">
                            <Text fontSize="12px" color="gray.400" fontWeight="semibold">Descrição</Text>
                            <Text fontSize="18px" color="gray.800">{proposal.vc_descricao}</Text>
                        </VStack>
                    </HStack>
                    {!owner && 
                        <>
                            <Divider my="20px" borderWidth="1px"/>
                            <Heading size="md" color="gray.600" my="15px">Dados do propositor</Heading>
                            <HStack whiteSpace="wrap" gap="20px">
                                <VStack justify="start" align="start" gap="1px" minW="200px">
                                    <Text fontSize="12px" color="gray.400" fontWeight="semibold">Nome</Text>
                                    <Text fontSize="18px" color="gray.800">{proposal.user?.vc_nome}</Text>
                                </VStack>            
                                <VStack justify="start" align="start" gap="1px" minW="200px">
                                    <Text fontSize="12px" color="gray.400" fontWeight="semibold">Estado</Text>
                                    <Text fontSize="18px" color="gray.800">{proposal.user?.userAddress?.vc_estado}</Text>
                                </VStack>  
                                <VStack justify="start" align="start" gap="1px" minW="200px">
                                    <Text fontSize="12px" color="gray.400" fontWeight="semibold">Cidade</Text>
                                    <Text fontSize="18px" color="gray.800">{proposal.user?.userAddress?.vc_cidade}</Text>
                                </VStack>    
                                <VStack justify="start" align="start" gap="1px" minW="200px">
                                    <Text fontSize="12px" color="gray.400" fontWeight="semibold">Reputação geral</Text>
                                    <Text fontSize="18px" color="gray.800">{proposal.user?.userReview?.tx_avaliacaoGeral} %</Text>
                                </VStack>                 
                            </HStack>
                        </>
                    }
                    <Divider my="20px" borderWidth="1px"/>
                    <Heading size="md" color="gray.600" my="25px">Itens da proposta</Heading>
                    <HStack whiteSpace="wrap" gap="20px">
                    <SimpleStateList labels={['Título', 'Descrição', 'Quantidade', 'Unidade', 'Situação', 'Categoria']}>
                        <>
                            {proposal.proposalItems?.map((item, index) => 
                                (
                                    <Tr key={item.id_detalheProposta} color="teal.800">
                                        <Td color="gray.400">{index + 1}.</Td>
                                        <Td maxW="150px" minW="150px" overflowX="hidden" whiteSpace="nowrap" textOverflow="ellipsis" title={item.vc_itemTitulo}>
                                            {item.vc_itemTitulo}
                                        </Td>
                                        <Td maxW="200px" minW="200px" overflowX="hidden" whiteSpace="nowrap" textOverflow="ellipsis" title={item.vc_descricao}>
                                            {item.vc_descricao}
                                        </Td>
                                        <Td maxW="100px" minW="100px">{item.fl_quantidade}</Td>
                                        <Td maxW="100px" minW="100px">{item.ch_unidade}</Td>
                                        <Td maxW="130px" minW="130px">{item.vc_situacaoProduto}</Td>
                                        <Td maxW="130px" minW="130px">{item.category?.vc_titulo}</Td>
                                    </Tr>
                                )    
                            )}
                        </>
                    </SimpleStateList>
                    </HStack>
                </ModalBody>
                <ModalFooter h="80px">
                    {owner ? 
                        <Button variant="inverse" isDisabled={["rejected", "accepted", "finished", "canceled"].includes(vc_status)} onClick={onCancel}>Cancelar</Button> :
                        <ButtonGroup isDisabled={["rejected", "accepted", "finished", "canceled"].includes(vc_status)}>
                            <Button variant="secondary" onClick={onReject}>Rejeitar</Button>
                            <Button onClick={onAccept}>Aceitar</Button>
                        </ButtonGroup>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
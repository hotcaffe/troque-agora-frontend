import { Avatar, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { NoticeCard } from "./NoticeCard";
import { NoticeInterestsCard } from "./NoticeInterestsCard";
import { Dispatch, SetStateAction } from "react";
import { INoticeData, INoticeFull } from "../../interfaces/notice";
import { IUserData } from "../../interfaces/profile";

const user = {
    name: "Raphael Fusco",
    email: "raphaelfusco@dominio.com"
}

interface INotice {
    setProposal: Dispatch<SetStateAction<boolean>>;
    notice: INoticeFull;
}

export function Notice({setProposal, notice}: INotice) {
    return (
        <>
            <HStack gap="10px" w="100%">
                <Avatar size="sm"/>
                <VStack align="start" gap="0">
                    <Text fontWeight="semibold" color="teal.800">{notice.user?.vc_nome}</Text>
                    <Text fontSize="12px" color="teal.800">{notice.user?.vc_email}</Text>
                </VStack>
            </HStack>
            <Flex gap="10px">
                <NoticeCard 
                    title={notice.vc_titulo} 
                    description={notice.vc_descricao} 
                    noticeTotalValue={notice.vl_preco}
                    noticeUnit={notice.ch_unidade}
                    noticeQuantity={notice.fl_quantidade}
                    advertiserChanges={notice.user?.userReview?.qt_trocasSucedidas}
                    advertiserReceivedChanges={notice.user?.userReview?.qt_trocasRecebidas}
                    advertiserRate={notice.user?.userReview?.tx_avaliacaoGeral}
                    imageList={notice.images}
                />
                {notice.noticeDetails && <NoticeInterestsCard interestList={notice.noticeDetails} setProposal={setProposal}/>}
            </Flex>
        </>
    )
}
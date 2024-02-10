import { Avatar, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { NoticeCard } from "./NoticeCard";
import { NoticeInterestsCard } from "./NoticeInterestsCard";
import { Dispatch, SetStateAction } from "react";
import { INoticeData } from "../../interfaces/notice";
import { IUserData } from "../../interfaces/profile";

const user = {
    name: "Raphael Fusco",
    email: "raphaelfusco@dominio.com"
}

interface INotice {
    setProposal: Dispatch<SetStateAction<boolean>>;
    notice: INoticeData;
    images: string[];
    userData: IUserData;
}

export function Notice({setProposal, notice, images, userData}: INotice) {
    console.log(notice)
    return (
        <>
            <HStack gap="10px" w="100%">
                <Avatar size="sm"/>
                <VStack align="start" gap="0">
                    <Text fontWeight="semibold" color="teal.800">{user.name}</Text>
                    <Text fontSize="12px" color="teal.800">{user.email}</Text>
                </VStack>
            </HStack>
            <Flex gap="10px">
                <NoticeCard 
                    title={notice.vc_titulo} 
                    description={notice.vc_descricao} 
                    noticeTotalValue={notice.vl_preco}
                    noticeUnit={notice.ch_unidade}
                    noticeQuantity={notice.fl_quantidade}
                    advertiserChanges={userData.avaliacaoUsuario.qt_trocasSucedidas}
                    advertiserReceivedChanges={userData.avaliacaoUsuario.qt_trocasRecebidas}
                    advertiserRate={userData.avaliacaoUsuario.tx_avaliacaoGeral}
                    imageList={images}
                />
                <NoticeInterestsCard interestList={notice.detalheTroca} setProposal={setProposal}/>
            </Flex>
        </>
    )
}
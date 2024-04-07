"use client"

import { InteractionIcon } from "@/components/common/InteractionIcon";
import { NoticeForm } from "@/components/notice/Form/NoticeForm";
import { UserContext } from "@/contexts/UserContext";
import { INoticeData, INoticeFull } from "@/interfaces/notice";
import { api } from "@/utils/api";
import { Center, HStack, Spinner, Text, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { RotateCw } from "react-feather";
import { useQuery } from "react-query";

export default function Page({params}: {params: {slug: number}}) {
    const toast = useToast();
    const [isNotFound, setIsNotFound] = useState(false);
    const {getUserData} = useContext(UserContext);

    async function get(): Promise<INoticeFull | undefined> {
        const user = getUserData();
        if (user) {
            try {
                return await api.get('/notice', {
                    params: {
                        id_usuarioAnuncio: user.id_usuario,
                        id_anuncioTroca: params.slug,
                        relations: 'noticeDetails'
                    }
                }).then(res => res.data)
            } catch {
                return;
            }
        }
    }

    const {data, isLoading, isError,  refetch} = useQuery('notice-editing', get, {
        onError: (err: any) => {
            if ([401, 404].includes(err?.response?.status)) {
                toast({
                    description: "Anúncio não encontrado!",
                    status: "info"
                })
                setIsNotFound(true)
                return;
            }
            setIsNotFound(false)
            toast({
                description: "Erro ao carregar anúncio para edição",
                status: "error"
            })
        }
    })

    return (
        <Center w="100vw">
            {isError ? 
                <HStack>
                    <Text fontWeight="semibold" color="gray.500">{isNotFound ? "Anúncio não encontrado! Tente novamente." : "Erro ao recuperar os dados! Tente novamente."}</Text> 
                    <InteractionIcon as={RotateCw} onClick={() => refetch()} aria-label="Recarregar conteúdo" color="teal.300"/> 
                </HStack> :
                <>
                    {(isLoading || !data) ? <Spinner /> : <NoticeForm title="Editar um anúncio:" data={data} />}
                </>
            }
        </Center>
    )
}
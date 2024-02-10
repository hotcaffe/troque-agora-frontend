"use client"

import { InteractionIcon } from "@/components/common/InteractionIcon";
import { NoticeForm } from "@/components/notice/Form/NoticeForm";
import { INoticeData } from "@/interfaces/notice";
import { api } from "@/utils/api";
import { Center, HStack, Spinner, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { RotateCw } from "react-feather";
import { useQuery } from "react-query";

export default function Page({params}: {params: {slug: number}}) {
    const toast = useToast();
    const [isNotFound, setIsNotFound] = useState(false);

    async function get(): Promise<INoticeData> {
        const userID = 1; 
        /* 
            Pegar do localStorage quando o login estiver completamente integrado. 
            (No backend, deve ser recuperado os anuncios com base no usuário passado, mas deve antes validar se o usuário passado na requisição é o mesmo do token de acesso)
        */
        return await api.get('/notice/' + params.slug, {
            params: {
                id_usuarioAnuncio: userID
            }
        }).then(res => res.data)
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
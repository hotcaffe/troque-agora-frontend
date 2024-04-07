"use client"

import { Box, Button, ButtonGroup, Center, Checkbox, Divider, Flex, HStack, Heading, Icon, Image, Input, Link, Select, Td, Text, Textarea, Tr, VStack, useToast } from "@chakra-ui/react";
import { FormBody } from "../../common/FormBody";
import { FormInput } from "../../common/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { INotice, INoticeDetails, INoticeFull, INoticeImages } from "../../../interfaces/notice";
import { AddNoticeItemForm } from "./NoticeItemForm";
import { InteractionIcon } from "@/components/common/InteractionIcon";
import { SimpleStateList } from "@/components/common/SimpleStateList";
import { Plus, X, XSquare } from "react-feather";
import {  useEffect, useRef, useState } from "react";
import { MaskedInput } from "@/components/common/MaskedInput";
import { api } from "@/utils/api";
import { ICategory } from "@/interfaces/category";
import { useRouter } from "next/navigation";

const schema = Yup.object().shape({
    id_usuarioAnuncio: Yup.number().required(),
    id_anuncioTroca: Yup.number().required(),
    id_categoria: Yup.number().typeError('É obrigatório informar a categoria!').required("É obrigatório informar a categoria!"),
    bo_ativo: Yup.boolean().required(),
    vc_titulo: Yup.string().min(5, "Deve possuir no mínimo 5 caracteres").max(128, "Maxímo de 128 caracteres").required("Campo obrigatório"),
    vc_descricao: Yup.string().min(24, "Deve possuir no mínimo 24 caracteres").max(256, "Máximo de 256 caracteres").required("Campo obrigatório"),
    fl_quantidade: Yup.number().typeError('Digite a quantidade').required("Campo obrigatório"),
    ch_unidade: Yup.string().max(4, "Maxímo de 4 caracteres").required("Campo obrigatório"),
    vl_preco: Yup.number().typeError('Digite o preço').required("Campo obrigatório"),
    vc_situacaoProduto: Yup.string().min(2, "Mínimo 2 caracteres").max(32, "Máximo de 32 caracteres").required("Campo obrigatório"),
    vc_situacaoAnuncio: Yup.string().required()
})

interface INoticeForm {
    title: string;
    data?: INoticeFull;
}

interface ImageBlob {
    url: string;
    blob: File;
}

export function NoticeForm({title, data}: INoticeForm) {
    const [detailList, setDetailList] = useState<INoticeDetails[]>(data?.noticeDetails ? [...data.noticeDetails] : [])
    const [images, setImages] = useState<ImageBlob[]>([])
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [removedImages, setRemovedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {register, handleSubmit, formState, setValue} = useForm<INotice>({
        mode: 'all',
        resolver: yupResolver(schema)
    });
    const {errors, dirtyFields, isDirty} = formState;
    const toast = useToast()
    const imageBtn = useRef<HTMLDivElement>(null);

    function onRemoveItem(index: number) {
        setDetailList(detailList => [...detailList.filter((_, subIndex) => subIndex != index)])
    }

    async function post(notice: INotice) {
        const body = {
            ...notice,
            noticeDetails: detailList
        }


        try {
            const response = await api.post('/notice', body).then(res => res.data);
            const formData = new FormData()
            images.map(image => formData.append('images', image.blob))
            
            await api.post("/notice/images", formData, {
                params: {
                    id_anuncioTroca: response.id_anuncioTroca
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            router.push("/home")
        } catch (error) {
            return;
        }
    }

    async function patch(notice: INotice) {
        if (!isDirty) {
            return toast({
                title: "Altere ao menos um campo para atualizar!",
                status: "info"
            })
        }

        const changedFields = {} as any;
        const objectNotice = new Object(notice) as any;

        for (const key in dirtyFields) {
            if (objectNotice.hasOwnProperty(key)) {
                changedFields[key] = objectNotice[key]
            }
        }


        await api.patch('/notice', changedFields, {
            params: {
                id_anuncioTroca: notice.id_anuncioTroca
            }
        })

        const formData = new FormData();
        if (removedImages.length > 0) {
            formData.append('imagesRemoved', removedImages.join(','))
        }

        const newImages = images.filter(image => image.blob.lastModified)
        if (newImages.length > 0) {
            newImages.map(image => formData.append('imagesInserted', image.blob))
        }

        await api.patch('/notice/images', formData, {
            params: {
                id_anuncioTroca: data?.id_anuncioTroca
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

    }

    async function onSubmit(notice: INotice) {
        try {
            if (images.length <= 0) {
                imageBtn.current?.scrollIntoView()
                return toast({
                    title: 'Envie ao menos uma foto para o seu anúncio!',
                    status: 'info'
                })
            }

            setIsLoading(true)

            if (data) {
                patch(notice)
                
            } else {
                post(notice)
            }

            toast({
                title: "Anúncio salvo com sucesso!",
                status: 'success',
                position: 'top-right'
            })
        } catch {
            return;
        } finally {
            setIsLoading(false)
        }
    }

    async function getCategories() {
        try {
            const categories = await api.get("/category", {
                params: {
                    bo_ativo: true
                }
            }).then(res => res.data) as ICategory[];

            setCategories(categories)
        } catch {
            return
        }
    }

    function onAddPhoto(file: File) {
        const url = URL.createObjectURL(file)
        const image = {
            url,
            blob: file
        }
        setImages(images => [...images, image])
    }
    
    function onRemovePhoto(url: string) {
        if (data) {
            const image = data.images.find(image => image.url == url);
            if (image) {
                setRemovedImages(removedImages => [...removedImages, image.name])
            }
        }
        setImages(images => images.filter(image => image.url != url));
    }

    async function URLToBlob(url: string) {
        return await fetch(url, {
            mode: 'no-cors'
        }).then(res => res.blob())
    }

    useEffect(() => {
        async function fillImages(source: INoticeImages[]) {
            const images = await Promise.all(source?.map(async (image) => {
                try {
                    const blob = await URLToBlob(image.url) as File;
                    return {
                        url: image.url,
                        blob
                    }
                } catch (error) {
                    return;
                }
            })) as ImageBlob[];

            if (images) setImages(images)
        } 
        getCategories()

        if (data && images.length <= 0) {
            fillImages(data.images)
        }
    }, [])


    return (
        <VStack maxW="1000px" bg="white" p="20px" rounded="10px">
            <FormBody as="form" title={title} >
                <Box visibility="hidden" h="0px" w="0px" display="none">
                    <Input {...register("id_usuarioAnuncio")} defaultValue={data ? data.id_usuarioAnuncio : "0"}/>
                    <Input {...register("id_anuncioTroca")} defaultValue={data ? data.id_anuncioTroca : "0"} />
                </Box>
                <FormInput title='Título' error={errors?.vc_titulo?.message} w="300px" man>
                    <Input placeholder="Digite o título da proposta" type="text" defaultValue={data && data.vc_titulo} {...register("vc_titulo")}/>
                </FormInput>
                <FormInput title='Valor a negociar' error={errors?.vl_preco?.message} w="200px" man>
                    <MaskedInput 
                        placeholder="Digite o valor"
                        mask={[{mask: Number, max: 99999999999999, thousandsSeparator: '.'}]} 
                        defaultValue={data && data.vl_preco} 
                        autoComplete="off"
                        {...register("vl_preco")}
                    />
                </FormInput>
                <FormInput title='Situação do item' error={errors?.vc_situacaoProduto?.message} w="300px" man>
                    <Input placeholder="Digite a situação do item" type="text" defaultValue={data && data.vc_situacaoProduto}  {...register("vc_situacaoProduto")}/>
                </FormInput>
                <FormInput title='Quantidade' error={errors?.fl_quantidade?.message} w="145px" man>
                    <MaskedInput 
                        placeholder="Quantidade"
                        mask={[
                            {mask: Number, max: 99999999999999999, thousandsSeparator: '.', scale: 6, from: 0}
                        ]} 
                        defaultValue={data && data.fl_quantidade}
                        autoComplete="off"
                        {...register("fl_quantidade")}
                    />
                </FormInput>
                <FormInput title='Unidade' error={errors?.ch_unidade?.message} w="145px" man>
                    <MaskedInput 
                        placeholder="Unidade"
                        mask="aaaa"
                        defaultValue={data && data.ch_unidade}
                        autoComplete="off"
                        {...register("ch_unidade")}
                    />
                </FormInput>
                <FormInput title='Categoria' error={errors?.id_categoria?.message} w="250px" man>
                    {categories && 
                        <Select {...register("id_categoria")} defaultValue={data && data?.category?.id_categoria} placeholder="Selecione uma categoria">
                            {categories.map(category => 
                                <option key={category.id_categoria} value={category.id_categoria}>{category.vc_titulo}</option>
                            )}
                        </Select>
                    }
                </FormInput>
                <FormInput title='Descrição' error={errors?.vc_descricao?.message} man>
                    <Textarea placeholder="Digite a descrição do seu anúncio" h="120px" defaultValue={data && data.vc_descricao} {...register("vc_descricao")}/>
                </FormInput>
                <Checkbox hidden {...register("bo_ativo")} defaultChecked={data && data.bo_ativo} display="hidden">Anúncio ativo?</Checkbox>
                <Checkbox hidden isChecked={true} defaultValue={data && data.vc_situacaoAnuncio} {...register("vc_situacaoAnuncio")} />
            </FormBody>
            <Divider borderWidth="2px" my="10px"/>
            <AddNoticeItemForm setDetailList={setDetailList}/>
            {detailList.length > 0 ? 
                <SimpleStateList labels={['Título', 'Descrição']}>
                    {detailList.map((item, index) => 
                        (
                            <Tr key={index} color="teal.800" overflowX="hidden">
                                <Td><InteractionIcon as={X} w="16px" h="16px" onClick={() => onRemoveItem(index)}/></Td>
                                <Td overflowX="hidden" whiteSpace="nowrap" textOverflow="ellipsis" title={item.vc_titulo}>
                                    {item.vc_titulo}
                                </Td>
                                <Td overflowX="hidden" whiteSpace="nowrap" textOverflow="ellipsis" title={item.vc_conteudo}>
                                    {item.vc_conteudo}
                                </Td>
                            </Tr>
                        )    
                    )}
                </SimpleStateList> : 
                <Center w="100%" h="150px">
                    <Text color="gray.400">Informe itens acima para adicioná-los na sua proposta!</Text>
                </Center>
            }
            <Divider borderWidth="2px" borderColor="teal.300" my="10px"/>
            <VStack w="100%" justify="start" align="start">
                <Heading fontSize="lg" color="teal.700" fontWeight="semibold" w="100%" mb="4px">Envie fotos do produto:</Heading>
                <HStack wrap="wrap" maxW="960px" py="10px">
                    {images && 
                        images.map(image => 
                            <Box key={image.url} minW="150px" h="150px">
                                <Icon as={XSquare} position="absolute" color="white" m="5px" ml="120px" fontSize="24px" _hover={{color: "red.300"}} cursor="pointer" zIndex={1} 
                                    onClick={() => onRemovePhoto(image.url)}
                                />
                                <Image src={image.url} objectFit="cover" minW="150px" maxW="150px" h="150px" rounded="10px" border="1px solid" borderColor="gray.400" shadow="md" filter="brightness(0.6)"/>
                            </Box>
                        )
                    }
                    {(images.length < 12) && 
                        <Center ref={imageBtn} minW="75px" h="150px" rounded="10px" border="1px solid" borderColor="gray.400" shadow="md" _hover={{bg: 'gray.100'}}>
                            <Input type="file" accept="image/*" w="75px" h="150px" position="absolute" opacity={0} cursor="pointer" 
                                onChange={(e) => e.target.files && onAddPhoto(e.target.files[0])}
                            />
                            <Icon as={Plus}/>
                        </Center>
                    }
                </HStack>
            </VStack>
            <Flex w="100%" justify="end">
                <ButtonGroup>
                    <Link href={data ? "/perfil" : "/home"}><Button variant="inverse" w="100px">Cancelar</Button></Link>
                    <Button w="100px" type="submit" onClick={handleSubmit(onSubmit)} isLoading={isLoading}>{data ? 'Atualizar' : 'Finalizar'}</Button>
                </ButtonGroup>
            </Flex>
        </VStack>
    )
}
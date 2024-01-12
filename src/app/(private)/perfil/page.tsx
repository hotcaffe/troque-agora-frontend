import { FormBody } from "@/components/common/FormBody";
import { Profile } from "@/components/profile/Profile";
import { Editable, EditablePreview, Flex, Heading, Input, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const userData = {
    username: 'rfusco',
    password: 'encrypt',
    vc_nome: "Raphael Alexandre Fusco",
    in_cpf: 11111111130,
    in_celular: 44999998888,
    in_idade: 22,
    vc_email: "raphaelfusco@gmail.com",
    bo_ativo: true,
    vc_lougradouro: "Rua teste dos testes",
    in_numero: 9999,
    vc_complemento: "Em frente ao tal",
    vc_bairro: "Centro",
    vc_cidade: "Mandaguari",
    vc_estado: "Paraná",
    qt_trocasSucedidas: 1320,
    qt_trocasRecebidas: 23320,
    qt_trocasAceitas: 1500,
    qt_trocasRecusadas: 21815,
    qt_trocasEnviadas: 5,
    tx_avaliacaoGeral: 75,
    bo_seloAtivo: true
}

export default function Page() {

    return (
        <Flex justify="center">
            <Profile userData={userData}/>
        </Flex>
    )
}
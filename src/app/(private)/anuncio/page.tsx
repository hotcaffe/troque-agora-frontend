import { NoticeForm } from "@/components/notice/Form/NoticeForm";
import { Center } from "@chakra-ui/react";

export default function Page() {
    return (
        <Center w="100vw">
            <NoticeForm title="Cadastrar um anúncio:" />
        </Center>
    )
}
"use client"

import { AccountForm } from "@/components/cadastro/AccountForm";
import { PersonDataForm } from "@/components/cadastro/PersonDataForm";
import { QRCodeForm } from "@/components/cadastro/QRCodeForm";
import { Box,  Center, Divider, Link, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, VStack, useSteps } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const steps = [
    {title: 'Dados pessoais', description: 'Seus dados pessoais'},
    {title: 'Conta', description: 'Dados da conta'},
    {title: 'Documentos', description: 'Verificar seus documentos'}
]

export default function Page() {
    const router = useRouter();
    const [data, setData] = useState()
    const {activeStep, setActiveStep, goToNext, isCompleteStep} = useSteps({
        index: 0,
        count: steps.length
    })

    function nextPage(newData: any) {
        if (data) {
            setData((data: any) => ({...data, ...newData}))
        } else {
            setData(newData)
        }
        goToNext()
    }

    function pickPage() {
        switch(activeStep) {
            case 0:
                return <PersonDataForm goToNext={nextPage}/>
            case 1:
                return <AccountForm goToNext={nextPage}/> 
            case 2:
                return <QRCodeForm goToNext={nextPage} user={data}/>
            default: 
                return <></>
        }
    }
    
    return (
        <Center py="20px" flexDirection="column" gap="20px">
            <Link  fontWeight="bold" onClick={() => router.push("/home")}>
                Retornar para a página principal
            </Link>
            <VStack w="1000px">
                <Stepper index={activeStep} colorScheme="teal" w="100%" >
                    {steps.map((step, index) => (
                        <Step key={index} >
                            <StepIndicator onClick={() => isCompleteStep(index) && setActiveStep(index)} cursor={isCompleteStep(index) ? "pointer" : "default"}>
                                <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />}/>
                            </StepIndicator>
                            <Box>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription >{step.description}</StepDescription>
                            </Box>
                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
                <Divider borderColor="white" borderWidth="2px" mb="10px" mt="5px"/>
                <Box w="100%" minH="700px" bg="white" rounded="10px" >
                    {pickPage()}
                </Box>
            </VStack>
        </Center>
    )
}
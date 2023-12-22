"use client"

import { AccountForm } from "@/components/cadastro/AccountForm";
import { PersonDataForm } from "@/components/cadastro/PersonDataForm";
import { QRCodeForm } from "@/components/cadastro/QRCodeForm";
import { Box,  Center, Divider, Link, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, VStack, useSteps } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const steps = [
    {title: 'Dados pessoais', description: 'Seus dados pessoais'},
    {title: 'Conta', description: 'Dados da conta'},
    {title: 'Documentos', description: 'Verificar seus documentos'}
]

export default function Page() {
    const router = useRouter();
    const {activeStep, setActiveStep, goToNext, isCompleteStep} = useSteps({
        index: 0,
        count: steps.length
    })

    function pickPage() {
        switch(activeStep) {
            case 0:
                return <PersonDataForm goToNext={goToNext}/>
            case 1:
                return <AccountForm goToNext={goToNext}/> 
            case 2:
                return <QRCodeForm goToNext={goToNext}/>
            default: 
                return <></>
        }
    }
    
    return (
        <Center h="100vh" flexDirection="column" gap="20px">
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
                <Box w="100%" h="700px" bg="white" rounded="10px" >
                    {pickPage()}
                </Box>
            </VStack>
        </Center>
    )
}
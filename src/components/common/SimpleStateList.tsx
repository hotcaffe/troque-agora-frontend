import { Table, TableContainer, TableContainerProps, TableRowProps, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

interface ISimpleStateList {
    labels: string[],
    children: JSX.Element | JSX.Element[],
}


export function SimpleStateList({labels, children}: ISimpleStateList) {
    return (
        <TableContainer maxH="300px" overflowY="scroll" overflowX="hidden" w="100%">
            <Table >
                <Thead >
                    <Tr>
                        <Th/>
                        {labels.map((label: string) => <Th key={label} color="gray.400">{label}</Th>)}
                    </Tr>
                </Thead>
                <Tbody maxH="300px" overflowY="scroll">
                    {children}
                </Tbody>
            </Table>
        </TableContainer>
    )
}
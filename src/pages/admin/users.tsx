import { Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";

import { TitleArea } from "../../components/global/Header/TitleArea";
import { useAPI } from "../../hooks/useAPI";
import type { UserInfo } from "../../types/api";
import { PADDING_BEFORE_FOOTER } from "../../utils/consts";

export const UserLists: React.FC<{}> = () => {

    const { data } = useAPI<Array<UserInfo>>(
        `/api/v1/admin/users`
    )
    
    return (
        <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
            <TitleArea>ユーザ管理</TitleArea>
            <Stack>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>氏名</Th>
                                <Th>メールアドレス</Th>
                                <Th>ロール</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data?.map((val, key) => {
                                    return (
                                        <Tr key={key}>
                                            <Td>{val.name}</Td>
                                            <Td>{val.email}</Td>
                                            <Td isNumeric>{val.role}</Td>
                                        </Tr>
                                    )
                                })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Stack>
        </VStack>
    )
}

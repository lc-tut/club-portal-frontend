import {
  Button,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { TitleArea } from "../../components/global/Header/TitleArea"
import { useAPI } from "../../hooks/useAPI"
import type { UserInfo } from "../../types/api"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"

export const UserLists: React.FC<{}> = () => {
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState<UserInfo[] | undefined>(undefined)
  const [totalPages, setTotalPages] = useState(1)

  const PER_PAGE = 8

  const { data } = useAPI<Array<UserInfo>>(`/api/v1/admin/users`)

  useEffect(() => {
    if (data) {
      const users = data.filter((val) => val.role !== "admin")
      setUsers(users)
      setTotalPages(Math.ceil(users.length / PER_PAGE))
    }
  }, [page, data])

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>ユーザ管理</TitleArea>
      <Stack w="100%" maxW={"1400px"} spacing={4} p={8}>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>サークル名</Th>
                <Th>メールアドレス</Th>
                <Th>操作</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users
                ?.slice((page - 1) * PER_PAGE, page * PER_PAGE)
                .map((val, key) => {
                  return (
                    <Tr key={key}>
                      <Td>{val.name}</Td>
                      <Td>{val.email}</Td>
                      <Td>
                        <Button
                          colorScheme="blue"
                          as={Link}
                          to={`/admin/users/edit/${val.userUuid}`}
                        >
                          編集
                        </Button>
                      </Td>
                    </Tr>
                  )
                })}
            </Tbody>
          </Table>
        </TableContainer>
        <HStack spacing={4} justify="center">
          <Button onClick={() => setPage(page - 1)} isDisabled={page === 1}>
            前へ
          </Button>
          <Box>
            ページ {page} / {totalPages}
          </Box>
          <Button
            onClick={() => setPage(page + 1)}
            isDisabled={page === totalPages}
          >
            次へ
          </Button>
        </HStack>
      </Stack>
    </VStack>
  )
}

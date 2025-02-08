import { Box, Flex, Text, HStack } from '@chakra-ui/react'
import Side from '@/components/parts/Sidebar'

/* eslint-disable @typescript-eslint/no-explicit-any */
const Dashboard = ({ children }: any) => {
  return (
    <Flex h='100vh'>
      <Side />

      {/* メインコンテンツ */}
      <Flex flex='1' direction='column'>
        {/* ヘッダー */}
        <Box bg='teal.500' p={4} color='white' boxShadow='sm'>
          <HStack justify='space-between'>
            <Text fontSize='xl' fontWeight='bold'>
              ダッシュボード
            </Text>
            <Text fontSize='sm'>Admin</Text>
          </HStack>
        </Box>

        {/* コンテンツ */}
        <Box p={6} bg='gray.50' flex='1' overflowY='auto'>
          {children}
          釣りアプリ管理画面
        </Box>
      </Flex>
    </Flex>
  )
}

export default Dashboard

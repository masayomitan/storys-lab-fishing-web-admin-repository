import { Box, Flex, Text, HStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Head from 'next/head'
import SideBar from '@/components/parts/Sidebar'

interface LayoutProps {
  children: ReactNode
}

const Dashboard = ({ children }: LayoutProps) => {
  return (
    <Flex h='100vh'>
      <Head>
        <title>{'title'}</title>
      </Head>
      <SideBar />

      {/* メインコンテンツ */}
      <Flex flex='1' direction='column'>
        {/* ヘッダー */}
        <Box bg='teal.500' p={4} color='white' boxShadow='sm'>
          <HStack justify='space-between'>
            <Text fontSize='xl' fontWeight='bold'>
              ヘッダー
            </Text>
            <Text fontSize='sm'>Admin</Text>
          </HStack>
        </Box>

        {/* コンテンツ */}
        <Box p={6} bg='gray.50' flex='1' overflowY='auto'>
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}

export default Dashboard

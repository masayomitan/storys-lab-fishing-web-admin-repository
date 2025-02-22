import { Box, Flex, Text, HStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Side from '@/components/parts/Sidebar'

interface LayoutProps {
  children: ReactNode
}

export const metadata = {
  title: '管理画面 | Fishing App',
  description: 'Fishing App の管理画面',
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex h='100vh'>
      <Side />

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

export default Layout

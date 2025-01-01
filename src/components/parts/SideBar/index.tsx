import { Box, Flex, Text, Link, VStack, HStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const SideBar = () => {
  return (
		<Box>
      <Box
        w='240px'
        bg='gray.800'
        color='white'
        p={4}
        display='flex'
        flexDirection='column'
      >
        <Text fontSize='2xl' fontWeight='bold' mb={6}>
          管理画面
        </Text>
        <VStack align='stretch'>
          <Link href='/fish-categories' _hover={{ color: 'teal.300' }}>
            魚カテゴリー
          </Link>
          <Link href='/fishes' _hover={{ color: 'teal.300' }}>
            魚
          </Link>
          <Link href='/areas' _hover={{ color: 'teal.300' }}>
            エリア
          </Link>
          <Link href='/tools' _hover={{ color: 'teal.300' }}>
            道具
          </Link>
        </VStack>
        <Text fontSize='sm' color='gray.400'>
          © 2024 管理画面
        </Text>
      </Box>
		</Box>
  )
}

export default SideBar

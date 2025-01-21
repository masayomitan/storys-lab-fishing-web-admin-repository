import { Box, Text, Link, VStack, Collapsible } from '@chakra-ui/react'

const Side = () => {
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

          <Collapsible.Root>

            <Collapsible.Trigger paddingY="3">通常機能</Collapsible.Trigger>
            <Collapsible.Content>

              <Collapsible.Root>
                <Box padding="4">
                  <Collapsible.Trigger paddingY="3">魚カテゴリ</Collapsible.Trigger>
                  <Collapsible.Content>
                    <Box padding="4">
                      <Link href='/fish-categories' _hover={{ color: 'teal.300' }}>
                        魚カテゴリ一覧
                      </Link>
                    </Box>
                    <Box padding="4">
                      <Link href='/fish-categories/create' _hover={{ color: 'teal.300' }}>
                        魚カテゴリ登録
                      </Link>
                    </Box>
                  </Collapsible.Content>
                </Box>
              </Collapsible.Root>

              <Collapsible.Root>
                <Box padding="4">
                  <Collapsible.Trigger paddingY="3">魚</Collapsible.Trigger>
                  <Collapsible.Content>
                    <Box padding="4">
                      <Link href='/fishes' _hover={{ color: 'teal.300' }}>
                        魚一覧
                      </Link>
                    </Box>
                    <Box padding="4">
                      <Link href='/fishes/create' _hover={{ color: 'teal.300' }}>
                        魚登録
                      </Link>
                    </Box>
                  </Collapsible.Content>
                </Box>
              </Collapsible.Root>

              <Collapsible.Root>
                <Box padding="4">
                  <Collapsible.Trigger paddingY="3">エリア(作成中)</Collapsible.Trigger>
                  <Collapsible.Content>
                    <Box padding="4">
                      {/* <Link href='/areas' _hover={{ color: 'teal.300' }}> */}
                        エリア一覧
                      {/* </Link> */}
                    </Box>
                    <Box padding="4">
                      {/* <Link href='/areas/create' _hover={{ color: 'teal.300' }}> */}
                        エリア登録
                      {/* </Link> */}
                    </Box>
                  </Collapsible.Content>
                </Box>
              </Collapsible.Root>

              <Collapsible.Root>
                <Box padding="4">
                  <Collapsible.Trigger paddingY="3">釣り場(作成中)</Collapsible.Trigger>
                  <Collapsible.Content>
                    <Box padding="4">
                      {/* <Link href='/areas' _hover={{ color: 'teal.300' }}> */}
                        釣り場一覧
                      {/* </Link> */}
                    </Box>
                    <Box padding="4">
                      {/* <Link href='/areas/create' _hover={{ color: 'teal.300' }}> */}
                        釣り場登録
                      {/* </Link> */}
                    </Box>
                  </Collapsible.Content>
                </Box>
              </Collapsible.Root>

              <Collapsible.Root>
                <Box padding="4">
                  <Collapsible.Trigger paddingY="3">道具(作成中)</Collapsible.Trigger>
                  <Collapsible.Content>
                    <Box padding="4">
                      {/* <Link href='/areas' _hover={{ color: 'teal.300' }}> */}
                        道具一覧
                      {/* </Link> */}
                    </Box>
                    <Box padding="4">
                      {/* <Link href='/areas/create' _hover={{ color: 'teal.300' }}> */}
                        道具登録
                      {/* </Link> */}
                    </Box>
                  </Collapsible.Content>
                </Box>
              </Collapsible.Root>

              <Collapsible.Root>
                <Box padding="4">
                  <Collapsible.Trigger paddingY="3">イベント(作成中)</Collapsible.Trigger>
                  <Collapsible.Content>
                    <Box padding="4">
                      {/* <Link href='/areas' _hover={{ color: 'teal.300' }}> */}
                        イベント一覧
                      {/* </Link> */}
                    </Box>
                    <Box padding="4">
                      {/* <Link href='/areas/create' _hover={{ color: 'teal.300' }}> */}
                        イベント登録
                      {/* </Link> */}
                    </Box>
                  </Collapsible.Content>
                </Box>
              </Collapsible.Root>

              <Collapsible.Root>
                <Box padding="4">
                  <Collapsible.Trigger paddingY="3">記事(作成中)</Collapsible.Trigger>
                  <Collapsible.Content>
                    <Box padding="4">
                      {/* <Link href='/areas' _hover={{ color: 'teal.300' }}> */}
                        記事一覧
                      {/* </Link> */}
                    </Box>
                    <Box padding="4">
                      {/* <Link href='/areas/create' _hover={{ color: 'teal.300' }}> */}
                        記事登録
                      {/* </Link> */}
                    </Box>
                  </Collapsible.Content>
                </Box>
              </Collapsible.Root>

            </Collapsible.Content>
          </Collapsible.Root>

          <Collapsible.Root>
            <Collapsible.Trigger paddingY="3">画像機能</Collapsible.Trigger>
            <Collapsible.Content>
              <Box padding="4">
                <Link href='/images' _hover={{ color: 'teal.300' }}>
                  一覧
                </Link>
              </Box>
              <Box padding="4">
                <Link href='/images/add' _hover={{ color: 'teal.300' }}>
                  登録
                </Link>
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>
        </VStack>
        <Text fontSize='sm' color='gray.400'>
          © 2024 管理画面
        </Text>
      </Box>
		</Box>
  )
}

export default Side

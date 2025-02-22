'use client'

import React, { } from 'react'

import {
  Box,
  Text,
} from '@chakra-ui/react'

/* eslint-disable @typescript-eslint/no-explicit-any */
const AreaCreate = ({ areaImages }: any) => {
  console.log(areaImages)
  return (
    <Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
      <Text fontSize='xl' fontWeight='bold' mb={4}>
        エリア登録フォーム
      </Text>

    </Box>
  )
}

export default AreaCreate

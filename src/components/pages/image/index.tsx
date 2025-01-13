'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Box,
  Text,
  VStack,
  Button,
  HStack,
  Image,
  Flex,
} from '@chakra-ui/react'

import ImageGrid from '@/components/parts/ImageGrid'

const Images = ({
  images,
}: any) => {

  return (
    <Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
      <ImageGrid images={images}/>
    </Box>
  )
}

export default Images

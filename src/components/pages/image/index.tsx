'use client'

// import { useState } from 'react'
import {
  Box,
} from '@chakra-ui/react'

import ImageGrid from '@/components/parts/ImageGrid'

const Images = ({
  images,
  /* eslint-disable @typescript-eslint/no-explicit-any */
}: any) => {

  return (
    <Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
      <ImageGrid images={images}/>
    </Box>
  )
}

export default Images

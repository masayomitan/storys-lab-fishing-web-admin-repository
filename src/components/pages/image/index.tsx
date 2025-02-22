'use client'

// import { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import ImageGrid from '@/components/parts/ImageGrid'
// import { useImages } from './logic'
import {
  // SelectRoot,
  // SelectTrigger,
  // SelectValueText,
  // SelectContent,
  // SelectItem,
} from '@/components/ui/select'
// import { createListCollection } from '@chakra-ui/react'

// const IMAGE_TYPES = [
//   { value: '1', label: 'タイプ 1' },
//   { value: '2', label: 'タイプ 2' },
//   { value: '3', label: 'タイプ 3' },
// ]

const Images = ({
  images
}) => {

  // const mappedImages = createListCollection({
  //   items: [
  //     IMAGE_TYPES
  //   ]
  // })
  // const { changeTypeRequest } = useImages()

  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="sm">
      {/* 画像タイプ選択ボックス */}
      {/* <SelectRoot 
        onValueChange={(value) => changeTypeRequest(value.value[0])}
        collection={mappedImages}
      >
        <SelectTrigger>
          <SelectValueText placeholder="画像タイプを選択してください" />
        </SelectTrigger>
        <SelectContent>
          {IMAGE_TYPES.map((item) => (
            <SelectItem key={item.value} item={item}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot> */}

      {/* 画像グリッドを表示 */}
      <ImageGrid images={images} />
    </Box>
  )
}

export default Images

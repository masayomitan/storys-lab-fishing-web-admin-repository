'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import {
  Box,
  Text,
  VStack,
  Button,
  HStack,
  Image,
  Flex,
} from '@chakra-ui/react'
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { createListCollection } from '@chakra-ui/react'
import { useUploadImage } from './logic'

const IMAGE_TYPES = [
  { value: 1, label: '魚' },
  { value: 2, label: 'エリア' },
  { value: 3, label: '釣り場' },
  { value: 4, label: '道具' },
]

const ImageAdd = () => {
  const [images, setImages] = useState<File[]>([])

  const { 
    control,
    handleSubmit,
    // watch,
    // setValue 
  } = useForm({
    defaultValues: {
      imageMetadata: images.map(() => ({
        name: '',
      })),
      image_type: null,
    },
  })
  const mappedImages = createListCollection({
    items: [
      { label: '魚', value: 1 },
      { label: 'エリア', value: 2 },
      { label: '釣り場', value: 3 },
      { label: '道具', value: 4 },
    ]
  })

  const onDrop = (acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles])
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    multiple: true,
  })

  const { handleUploadRequest } = useUploadImage()
   /* eslint-disable @typescript-eslint/no-explicit-any */
  const onSubmit = (data: any) => {
    const payload = {
      images,
      image_type: data.image_type,
    }
    handleUploadRequest(payload)
  }

  return (
    <Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
      <Text fontSize='xl' fontWeight='bold' mb={4}>
        画像アップロード
      </Text>

      {/* ドラッグ＆ドロップエリア */}
      <Box
        {...getRootProps()}
        border='2px dashed'
        borderColor='teal.500'
        p={6}
        borderRadius='md'
        textAlign='center'
        mb={4}
        bg='gray.50'
        _hover={{ bg: 'gray.100' }}
      >
        <input {...getInputProps()} />
        <Text>ここに画像をドラッグ＆ドロップしてください</Text>
        <Text fontSize='sm' color='gray.500'>
          またはクリックして選択
        </Text>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* アップロード済みの画像一覧 */}
        {images.length > 0 && (
          <VStack align='stretch'>
            <Text fontSize='lg' fontWeight='bold' mt={4}>
              アップロード済みの画像
            </Text>

            {images.map((file, index) => (
              <Flex
                key={index}
                align='center'
                justify='space-between'
                borderWidth='1px'
                borderRadius='md'
                p={2}
                bg='gray.100'
              >
                <HStack>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    boxSize='50px'
                    objectFit='cover'
                    borderRadius='md'
                  />
                  <Text fontSize='sm'>{file.name}</Text>
                </HStack>
                <Button
                  size='sm'
                  colorScheme='red'
                  onClick={() => removeImage(index)}
                >
                  削除
                </Button>
              </Flex>
            ))}
          </VStack>
        )}
        <Box mt={4}>
          <Text fontSize='md' fontWeight='bold' mb={2}>
            画像タイプを選択
          </Text>
          <Controller
            control={control}
            name='image_type'
            render={({ field }) => (
              <SelectRoot
                onValueChange={(value) => field.onChange(parseInt(value.value[0]))}
                collection={mappedImages}
              >
                <SelectTrigger>
                  <SelectValueText placeholder='画像タイプを選択してください' />
                </SelectTrigger>
                <SelectContent>
                  {IMAGE_TYPES.map((type) => (
                    <SelectItem 
                      key={type.value}
                      item={type}
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            )}
          />
        </Box>

        {/* アップロードボタン */}
        <Button
          type='submit'
          colorScheme='teal'
          w='full'
          mt={6}
          // disabled={images.length === 0}
        >
          アップロード
        </Button>
      </form>
    </Box>
  )
}

export default ImageAdd

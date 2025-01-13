import { Box, Grid, Text } from '@chakra-ui/react'
import Image from 'next/image'

const ImageGrid = ({ 
    images
}: any) => {
  return (
    <Box p={6} bg="gray.100" minH="100vh">
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
        画像一覧
      </Text>
      <Grid
        templateColumns="repeat(5, minmax(200px, 1fr))"
        gap={6}
        justifyContent="center"
      >
        {images.map((image: any, index: any) => (
          <Box 
            key={index}
            borderWidth="1px"
            overflow="hidden"
            width="250px"
            height="250px"
          >
            <Image
              src={image.image_url}
              alt='test'
              width={250}
              height={250}
              objectFit="contain"
              layout="responsive"
              style={{
                // objectFit: "cover"
              }}
            />
            <Box p={2} textAlign="center">
              <Text fontSize="sm" fontWeight="bold">
                {image.name}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export default ImageGrid

import { Box } from '@chakra-ui/react'
import AreaCreate from '@/components/pages/area/create'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'
export const revalidate = 0

const AreaCreatePage = async () => {

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const prefectures = await apiClient.get<any[]>(`/admin/prefectures`)

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const areaImages = await apiClient.get<any[]>(`/admin/images?type=2`)

  return (
    <Layout>
      <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
        <AreaCreate
          areaImages={areaImages}
          prefectures={prefectures}
        />
      </Box>
    </Layout>
  )
}

export default AreaCreatePage

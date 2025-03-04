import { Box } from '@chakra-ui/react'
import AreaUpdate from '@/components/pages/area/update/index'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'
export const revalidate = 60

export const generateStaticParams = async (): Promise<{ id: string }[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/areas`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  })
  if (!res.ok) {
    return []
  }

  const areas = await res.json()

  return areas.map((category: { id: number }) => ({
    id: category.id.toString(),
  }))
}

type AreaPageProps = {
  params: Promise<{
    id: string 
  }>
}

const AreaUpdatePage = async ({ params }: AreaPageProps) => {
  const { id } = await params

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const area = await apiClient.get<any[]>(`/admin/areas/${id}`)

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const prefectures = await apiClient.get<any[]>(`/admin/prefectures`)

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const areaImages = await apiClient.get<any[]>(`/admin/images?type=2`)

  return (
    <Layout>
      <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
        <AreaUpdate 
          area={area} 
          prefectures={prefectures}
          areaImages={areaImages}
        />
      </Box>
    </Layout>
  )
}

export default AreaUpdatePage

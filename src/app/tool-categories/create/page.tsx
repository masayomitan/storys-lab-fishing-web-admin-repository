import { Box } from '@chakra-ui/react'
import ToolCategoryCreate from '@/components/pages/toolCategory/create'
import Layout from '@/components/parts/Layout'

const ToolCategoryCreatePage = () => {
    return (
        <Layout>
            <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
                <ToolCategoryCreate />
            </Box>
        </Layout>
    )
}

export default ToolCategoryCreatePage

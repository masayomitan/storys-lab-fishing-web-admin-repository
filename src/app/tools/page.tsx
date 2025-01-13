import { Box, Text } from "@chakra-ui/react"
// import Layout from '../../../../storys-lab-fishing-web-repository/src/components/parts/Layout/layout'

const ToolAdminPage = () => {
  return (
    // <Layout>
      <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
        <Text fontSize="lg" fontWeight="bold">
          魚管理
        </Text>
        <Text mt={2}>ここで魚のデータを管理します。</Text>
      </Box>
    // </Layout>
  )
}

export default ToolAdminPage

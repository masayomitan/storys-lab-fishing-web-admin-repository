import { useCallback } from 'react'

import { toaster } from '@/components/ui/toaster'

export const SUCCESS_TOAST_ID = 'success-toast'
export const ERROR_TOAST_ID = 'error-toast'

/* eslint-disable @typescript-eslint/no-explicit-any */
const baseToast: any = {
  position: 'bottom-left',
  title: '保存しました',
  duration: 5000,
  isClosable: true,
  containerStyle: {
    margin: { base: '0 0 60px 16px', lg: '0 0 50px 240px' },
  },
}

export const useToastMessage = () => {

  const successToast = useCallback(
    (message = '成功しました') => {
      toaster.create({
        ...baseToast,
        id: SUCCESS_TOAST_ID,
        title: message,
        status: 'success',
      })
    },
    []
  )

  const errorToast = useCallback(
    (message = '失敗しました') => {
      toaster.create({
        ...baseToast,
        id: ERROR_TOAST_ID,
        title: message,
        status: 'error',
      })
    },
    []
  )

  return {
    successToast,
    errorToast,
  }
}

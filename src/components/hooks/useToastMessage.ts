import { useCallback } from 'react'

import { toaster } from '@/components/ui/toaster'

export const SUCCESS_TOAST_ID = 'success-toast'
export const ERROR_TOAST_ID = 'error-toast'

interface ToastOptions {
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  title: string;
  duration: number;
  isClosable: boolean;
  containerStyle: {
    margin: {
      base: string;
      lg: string;
    };
    width?: string;
    padding?: string;
    fontSize?: string;
  };
  id?: string;
  type?: 'success' | 'error';
}

const baseToast: ToastOptions = {
  position: 'bottom-left',
  title: '保存しました',
  duration: 5000,
  isClosable: true,
  containerStyle: {
    margin: { base: '0 0 60px 16px', lg: '0 0 50px 240px' },
    width: '400px',
    padding: '20px',
    fontSize: '18px',
  },
}

export const useToastMessage = () => {
  const successToast = useCallback(
    (message = '成功しました') => {
      toaster.create({
        ...baseToast,
        id: SUCCESS_TOAST_ID,
        title: message,
        type: 'success',
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
        type: 'error',
      })
    },
    []
  )

  return {
    successToast,
    errorToast,
  }
}

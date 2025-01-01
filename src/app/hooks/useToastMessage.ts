import { useCallback } from 'react'

import { Toaster, toaster } from '@/components/ui/toaster'

/**
 * ローカル環境でuseEffectの中でtoastを表示すると、2回表示されることがある。
 * 理由はreactStrictMode: trueの影響でローカル環境のみuseEffectが1回余分に実行されるためである。
 * toastが2回表示されないようにtoastのidを指定し、isActiveで表示されているかを判定する。

 * see: https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development
 * see: https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
 */
export const SUCCESS_TOAST_ID = 'success-toast'
export const ERROR_TOAST_ID = 'error-toast'

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

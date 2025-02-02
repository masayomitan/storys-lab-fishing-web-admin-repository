'use client'

import { Button } from "@chakra-ui/react"
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog"

type ConfirmDeleteDialogProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const ConfirmDeleteDialog = ({ isOpen, onClose, onConfirm }: ConfirmDeleteDialogProps) => {
  return (
    <DialogRoot open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>削除の確認</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>本当に削除しますか？ この操作は元に戻せません。</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button colorScheme="red" onClick={onConfirm}>
            削除
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default ConfirmDeleteDialog

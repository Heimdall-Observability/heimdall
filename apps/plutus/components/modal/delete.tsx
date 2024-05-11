'use client'

import { useState } from 'react'

import { deleteUser } from '@/app/(dashboard)/app/settings/apis'
import { useUser } from '@/components/client-provider/auth-provider'
import CircleLoader from '@/components/loader/circle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import Modal from '.'

export default function DeleteModal({
  show,
  onHide,
}: {
  show: boolean
  onHide: () => void
}) {
  const user = useUser()
  const [loading, setLoading] = useState(false)
  const [verify, setVerify] = useState('')
  const supabase = createClientComponentClient()

  const onDelete = async () => {
    if (verify === user.email) {
      setLoading(true)
      await deleteUser()
      setLoading(false)
      await supabase.auth.signOut()
      window.location.href = '/signup'
    }
  }

  return (
    <Modal
      show={show}
      title="Delete Your Account"
      onHide={onHide}
      someRef={null}
    >
      <div className="text-sm text-primary dark:text-muted-foreground">
        Type this account email to delete your account and its data.
      </div>
      <Input
        className="mt-3"
        placeholder="Email"
        type="email"
        onChange={(event) => {
          setVerify(event.target.value)
        }}
      />
      <Button
        onClick={onDelete}
        variant={'destructive'}
        disabled={loading || verify !== user.email}
        className="user-select-none mt-4 w-full"
      >
        {loading ? <CircleLoader /> : 'Confirm delete'}
      </Button>
    </Modal>
  )
}

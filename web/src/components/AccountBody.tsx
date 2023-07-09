'use client'

import { useState } from 'react'
import { AccountSignIn } from './AccountSignIn'
import { AccountSignUp } from './AccountSignUp'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { AxiosError } from 'axios'
import ObjectResponse from './shared/core/object-response'
import { formatterMessageErro } from '@/util/formatter'

export default function AccountBody() {
  const router = useRouter()
  const [isSignIn, setSignIn] = useState<boolean>(true)
  const [msgError, setMsgError] = useState<string | null>(null)

  async function handleSignInOrSignUp(url: string, data: any) {
    try {
      const result = await api.post<ObjectResponse<{ token: string }>>(
        url,
        data,
      )
      const response = result.data
      const user = response.data
      if (user) {
        document.cookie = `token=${user.token}; Path=/; max-age=2592000`
        router.push('/')
      }
    } catch (e) {
      const { response } = e as AxiosError<ObjectResponse<null>>
      setMsgError(formatterMessageErro(response?.data?.message))
    }
  }

  function handleSetSignIn(value: boolean) {
    setMsgError(null)
    setSignIn(value)
  }

  return (
    <div className="w-full px-8 pb-8">
      {isSignIn ? (
        <AccountSignIn
          msgError={msgError}
          setSignIn={handleSetSignIn}
          handleSignInOrSignUp={handleSignInOrSignUp}
        />
      ) : (
        <AccountSignUp
          msgError={msgError}
          setMsgError={setMsgError}
          setSignIn={handleSetSignIn}
          handleSignInOrSignUp={handleSignInOrSignUp}
        />
      )}
    </div>
  )
}

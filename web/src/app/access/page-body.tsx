'use client'

import { SignIn } from '@/components/access/SignIn'
import { SignUp } from '@/components/access/SignUp'
import { ToastAlert } from '@/components/shared/ToastAlert'
import { useState } from 'react'

export default function AccessBody() {
  const [isSignIn, setSignIn] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="mt-20 flex h-full justify-center">
      <div className="basis-1/3">
        {error ? <ToastAlert title={error} close={() => setError(null)} /> : ''}
        <div className="rounded-lg border border-gray-200 bg-white  p-4 shadow-md sm:p-6 lg:p-8">
          {isSignIn ? (
            <SignIn setSignIn={setSignIn} setError={setError} />
          ) : (
            <SignUp setSignIn={setSignIn} setError={setError} />
          )}
        </div>
      </div>
    </div>
  )
}

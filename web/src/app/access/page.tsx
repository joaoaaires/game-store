'use client'

import { SignIn } from '@/components/access/SignIn'
import { SignUp } from '@/components/access/SignUp'
import { ToastAlert } from '@/components/shared/ToastAlert'
import { useState } from 'react'

export default function Access() {
  const [isSignIn, setSignIn] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="isolate  px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-lg">
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

import { api } from '@/lib/api'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import User from './core/user'
import ObjectResponse from '../shared/core/object-response'

interface SignInProps {
  setSignIn: (option: boolean) => void
  setError: (text: string) => void
}

export function SignIn({ setSignIn, setError }: SignInProps) {
  const router = useRouter()

  function handleUpdateSign() {
    setSignIn(false)
  }

  async function handleAccessUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    try {
      const result = await api.post<ObjectResponse<User>>('/signin', {
        email: formData.get('email'),
        password: formData.get('password'),
      })

      const response = result.data
      const user = response.data
      if (user) {
        document.cookie = `token=${user.token}; Path=/; max-age=2592000`
        router.push('/')
      }
    } catch (e) {
      const { response } = e as AxiosError<ObjectResponse<null>>
      setError(`${response?.data?.message}`)
    }
  }

  return (
    <form onSubmit={handleAccessUser}>
      <h3 className="text-xl font-bold">Log in to your account</h3>
      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Username or email
        </label>
        <input
          name="email"
          id="email"
          className="w-full rounded border border-gray-300 bg-gray-50 p-2.5 leading-relaxed focus:ring-0"
        />
      </div>
      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full rounded border border-gray-300 bg-gray-50 p-2.5 leading-relaxed focus:ring-0 "
        />
      </div>

      <div className="mt-6 text-sm text-gray-400">
        <button
          type="submit"
          className="mr-2 inline-block self-end rounded bg-purple-500 px-5 py-3  font-medium leading-none  text-white transition-colors hover:bg-purple-600"
        >
          Log in
        </button>
        or{' '}
        <span
          onClick={handleUpdateSign}
          className="cursor-pointer text-gray-600 underline transition-colors hover:text-gray-800"
        >
          Create account
        </span>
      </div>
    </form>
  )
}

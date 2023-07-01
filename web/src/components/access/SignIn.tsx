import { api } from '@/lib/api'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

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
      const response = await api.post('/signin', {
        email: formData.get('email'),
        password: formData.get('password'),
      })
      console.log(response)
      router.push('/')
    } catch (e) {
      const { response } = e as AxiosError<{
        status: number
        data: object
        message: string
      }>
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
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  sm:text-sm"
        />
      </div>
      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 sm:text-sm"
        />
      </div>

      <div className="mt-6 text-sm text-gray-400">
        <button
          type="submit"
          className="mr-2 inline-block self-end rounded-lg bg-purple-500 px-5 py-3  font-medium leading-none  text-white transition-colors hover:bg-purple-600"
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

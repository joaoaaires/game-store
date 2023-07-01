import { api } from '@/lib/api'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

interface SignUpProps {
  setSignIn: (option: boolean) => void
  setError: (text: string) => void
}

export function SignUp({ setSignIn, setError }: SignUpProps) {
  const router = useRouter()

  function handleUpdateSign() {
    setSignIn(true)
  }

  async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const isAcceptTerm = formData.get('isAcceptTerm')

    if (!isAcceptTerm) {
      return setError('term-not-accept')
    }

    const password = formData.get('password')
    const repeatPassword = formData.get('repeatPassword')

    if (!(password === repeatPassword)) {
      return setError('password-not-equals')
    }

    try {
      const response = await api.post('/signup', {
        name: formData.get('name'),
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
    <form onSubmit={handleCreateUser}>
      <h3 className="text-xl font-bold">Create an account</h3>
      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">Username</label>
        <input
          name="name"
          id="name"
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
      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Repeat password
        </label>
        <input
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 sm:text-sm"
        />
      </div>
      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Your email addres
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 sm:text-sm"
          placeholder="name@exemple.com"
        />
      </div>
      <div className="mt-6">
        <label
          htmlFor="isAcceptTerm"
          className="mb-2 flex items-center gap-1.5 text-sm font-medium "
        >
          <input
            type="checkbox"
            name="isAcceptTerm"
            id="isAcceptTerm"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 focus:ring-0"
          />
          I accept the{' '}
          <a
            href=""
            className="text-purple-500 underline transition-colors hover:text-purple-600"
          >
            Terms of Service
          </a>
        </label>
      </div>
      <div className="mt-6 text-sm text-gray-400">
        <button
          type="submit"
          className="mr-2 inline-block self-end rounded-lg bg-purple-500 px-5 py-3  font-medium leading-none  text-white transition-colors hover:bg-purple-600"
        >
          Create account
        </button>
        or already have an account?{' '}
        <span
          onClick={handleUpdateSign}
          className="cursor-pointer text-gray-600 underline transition-colors hover:text-gray-800"
        >
          Log in
        </span>
      </div>
    </form>
  )
}

import { FormEvent } from 'react'
import Alert from './Alert'

interface SignInProps {
  msgError: string | null
  setSignIn: (option: boolean) => void
  handleSignInOrSignUp: (url: string, data: any) => void
}

export function SignIn({
  msgError,
  setSignIn,
  handleSignInOrSignUp,
}: SignInProps) {
  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    handleSignInOrSignUp('/signin', {
      email: formData.get('email'),
      password: formData.get('password'),
    })
  }

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-y-6 text-white">
      <div className="flex justify-center text-xl font-bold">Fazer login</div>
      <Alert text={msgError} />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">E-mail</label>
        <input
          name="email"
          id="email"
          className="rounded bg-white p-3 leading-relaxed text-black-900 placeholder-black-900 focus:ring-0"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Senha</label>
        <input
          type="password"
          name="password"
          id="password"
          className="rounded border bg-white p-3 leading-relaxed text-black-900 placeholder-black-900 focus:ring-0 "
        />
      </div>
      <div className="flex flex-row items-center gap-1.5 text-sm">
        <button
          type="submit"
          className="rounded bg-teal-700 px-5 py-3 font-medium  text-white transition-colors hover:bg-teal-800"
        >
          Entrar
        </button>
        ou
        <span
          onClick={() => setSignIn(false)}
          className="cursor-pointer text-black-100 underline transition-colors hover:text-black-500"
        >
          criar conta
        </span>
      </div>
    </form>
  )
}

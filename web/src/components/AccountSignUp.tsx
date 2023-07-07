import { FormEvent } from 'react'
import Alert from './Alert'

interface AccountSignUpProps {
  msgError: string | null
  setMsgError: (error: string) => void
  setSignIn: (option: boolean) => void
  handleSignInOrSignUp: (url: string, data: any) => void
}

export function AccountSignUp({
  msgError,
  setMsgError,
  setSignIn,
  handleSignInOrSignUp,
}: AccountSignUpProps) {
  async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const isAcceptTerm = formData.get('isAcceptTerm')

    if (!isAcceptTerm) {
      return setMsgError('term-not-accept')
    }

    const password = formData.get('password')
    const repeatPassword = formData.get('repeatPassword')

    if (!(password === repeatPassword)) {
      return setMsgError('password-not-equals')
    }

    handleSignInOrSignUp('/signup', {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    })
  }

  return (
    <form
      onSubmit={handleCreateUser}
      className="flex flex-col gap-y-6 text-white"
    >
      <div className="flex justify-center text-xl font-bold">
        Criar uma Conta da Store
      </div>
      <Alert text={msgError} />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Nome</label>
        <input
          name="name"
          id="name"
          className="rounded bg-white p-3 leading-relaxed text-black-900 placeholder-black-900 focus:ring-0"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">E-mail</label>
        <input
          name="email"
          id="email"
          className="rounded bg-white p-3 leading-relaxed text-black-900 placeholder-black-600 focus:ring-0"
          placeholder="name@exemple.com"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Senha</label>
        <input
          name="password"
          id="password"
          className="rounded bg-white p-3 leading-relaxed text-black-900 placeholder-black-900 focus:ring-0"
          type="password"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Repita a senha</label>
        <input
          name="repeatPassword"
          id="repeatPassword"
          className="rounded bg-white p-3 leading-relaxed text-black-900 placeholder-black-900 focus:ring-0"
          type="password"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="isAcceptTerm" className="flex items-center gap-2">
          <input
            name="isAcceptTerm"
            id="isAcceptTerm"
            className="h-4 w-4 rounded border-black-700 bg-gray-700 text-teal-500 focus:ring-0"
            type="checkbox"
            value="true"
          />
          Eu aceito o{' '}
          <a
            href="#"
            className="text-teal-500 underline transition-colors hover:text-teal-600"
          >
            Termos de serviço
          </a>
        </label>
      </div>
      <div className="flex flex-row items-center gap-1.5 text-sm">
        <button
          type="submit"
          className="rounded bg-teal-700 px-5 py-3 font-medium  text-white transition-colors hover:bg-teal-800"
        >
          Criar conta
        </button>
        ou já tem uma conta?
        <span
          onClick={() => setSignIn(true)}
          className="cursor-pointer text-black-100 underline transition-colors hover:text-black-500"
        >
          entrar
        </span>
      </div>
    </form>
  )
}

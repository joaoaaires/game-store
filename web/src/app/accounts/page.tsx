import Image from 'next/image'
import Logo from '../../assets/logo.svg'
import AccountBody from '@/components/AccountBody'
import { redirect } from 'next/navigation'
import { getUser } from '@/util/auth'

export default function Accounts() {
  const user = getUser()

  if (user?.isDev) {
    return redirect('/')
  }

  return (
    <div className="h-full w-full">
      <div className="mt-20 flex justify-center">
        <div className="flex basis-1/3 flex-col items-center rounded-xl bg-black-700 text-white shadow-md shadow-black-800">
          <Image src={Logo} alt="" className="h-28 w-28" />
          <AccountBody />
        </div>
      </div>
    </div>
  )
}

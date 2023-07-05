import Image from 'next/image'
import Logo from '../../assets/logo.svg'
import PainelBody from '@/components/accounts/PainelBody'

export default function Accounts() {
  return (
    <div className="h-full w-full">
      <div className="mt-20 flex justify-center">
        <div className="flex basis-1/3 flex-col items-center rounded-xl bg-black-700 text-white shadow-md shadow-black-800">
          <Image src={Logo} alt="" className="h-28 w-28" />
          <PainelBody />
        </div>
      </div>
    </div>
  )
}

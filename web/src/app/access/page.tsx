import { Header } from '@/components/shared/Header'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AccessBody from './page-body'

export default function Access() {
  const token = cookies().get('token')?.value
  if (token) {
    redirect('/')
  }

  return (
    <>
      <Header full={false} />
      <AccessBody />
    </>
  )
}

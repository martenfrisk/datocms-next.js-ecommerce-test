import Link from 'next/link'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Container from '@/components/container'
import { useSession } from 'next-auth/client'

export default function Profile() {
  const [session, loading] = useSession()
  return (
    <Container>
      <Layout showCartButton="false">
        <Header />
        <div className="flex justify-center">
          {session && !loading ? (
            <div className="flex flex-col space-y-4 items-center">
              <img src={session.user.image} alt="" className="w-20 border-4 border-blue-400 shadow-inner h-20 rounded-full" />
              <h2>
                Welcome to your profile page
                {' '}
                {session.user.name}
              </h2>
              <Link href="/api/auth/signout">
                <p className="border-b cursor-pointer hover:text-blue-700 border-blue-700 border-dashed">
                  Click here to sign out
                </p>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 items-center">
              <p>
                You are not signed in
              </p>
              <Link href="/api/auth/signin">
                <p className="border-b cursor-pointer hover:text-blue-700 border-blue-700 border-dashed">
                  Click here to sign in
                </p>
              </Link>
            </div>
          )}
        </div>
      </Layout>
    </Container>
  )
}

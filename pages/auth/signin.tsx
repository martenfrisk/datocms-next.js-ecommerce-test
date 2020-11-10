import Layout from '@/components/layout'
import Container from '@/components/container'
import Header from '@/components/header'
import { getProviders, signIn } from 'next-auth/client'

const SignIn = ({ providers }: { providers: object}) => (
  <Layout showCartButton="false">
    <Container>
      <Header />
      <div className="w-full flex justify-center pt-10">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className="bg-blue-700 text-white rounded-md border-2 border-blue-700 hover:bg-white hover:text-blue-700 hover:border-blue-700 font-light px-4 py-2" onClick={() => signIn(provider.id, { callbackUrl: '/' })} type="button">
              Sign in with
              {' '}
              {provider.name}
            </button>
          </div>
        ))}
      </div>
    </Container>
  </Layout>
)

export async function getStaticProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

export default SignIn

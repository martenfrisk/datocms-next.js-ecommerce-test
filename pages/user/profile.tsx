import Layout from '@/components/layout'
import Header from '@/components/header'
import Container from '@/components/container'

export default function Profile() {
  return (
    <Container>
      <Layout showCartButton="false">
        <Header />
        <div className="flex justify-center">
          <div className="flex flex-col space-y-4 items-center">
            <h2>
              Welcome to your profile page.
            </h2>
          </div>
        </div>
      </Layout>
    </Container>
  )
}

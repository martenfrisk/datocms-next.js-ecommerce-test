import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Container from '@/components/container'

export default function Profile() {
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const getUser = window.localStorage.getItem('username')
    setUser(getUser)
  }, [])
  async function getUserData() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
    }
    await fetch('https://testbutik-783b.restdb.io/rest/orders?apikey=5fabefbd8639597288385276', requestOptions)
      .then((result) => result.json())
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error))
  }
  getUserData()
  return (
    <Container>
      <Layout showCartButton="false">
        <Header />
        <div className="flex justify-center w-full">
          <div className="flex flex-col items-center w-full space-y-4">
            <h2>
              Welcome to your profile page
              {user !== '' ? ` ${user}.` : '.'}
            </h2>
            {loading ? (
              <svg className="w-10 h-10 text-blue-700 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (

              <div className="flex flex-wrap w-full md:w-1/2">
                {orders && (
                <>
                  <p className="w-full mb-4 text-xl">Your latest orders</p>
                  {
                    orders
                      .filter((order) => order.user === user)
                      .map((order) => (
                        <div className="flex flex-wrap w-full">
                          <div className="w-1/5 text-xs">
                            {new Date(order.time).toLocaleDateString()}
                          </div>
                          <div className="flex flex-wrap w-4/5">
                            {order.order.map((i: any) => (
                              <>
                                <div className="w-3/5 hover:underline hover:text-blue-700">
                                  <Link href={`/products/${i.slug}`}>
                                    {i.item}
                                  </Link>
                                </div>
                                <div className="w-1/5">
                                  x
                                  &nbsp;
                                  {i.quantity}
                                </div>
                                <div className="w-1/5">
                                  {i.price}
                                  :-
                                </div>
                              </>
                            ))}
                          </div>
                        </div>
                      ))
                  }
                </>
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Container>
  )
}

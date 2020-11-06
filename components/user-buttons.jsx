// import { CMS_NAME, CMS_URL } from '../lib/constants'
// import { User32, ShoppingBag32, Favorite32 } from '@carbon/icons-react'
import User from '@carbon/icons-react/lib/user/32'
import ShoppingBag from '@carbon/icons-react/lib/shopping--bag/32'
import Favorite from '@carbon/icons-react/lib/favorite/32'

export default function UserButtons() {
  return (
    <section className="flex items-center justify-between  space-x-4">
      <User className="cursor-pointer hover:text-blue-700 duration-200 transition-colors" />
      <ShoppingBag className="cursor-pointer hover:text-blue-700 duration-200 transition-colors" />
      <Favorite className="cursor-pointer hover:text-blue-700 duration-200 transition-colors" />
    </section>
  )
}

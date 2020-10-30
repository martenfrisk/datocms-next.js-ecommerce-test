// import { CMS_NAME, CMS_URL } from '../lib/constants'
import { User32, ShoppingBag32, Favorite32 } from "@carbon/icons-react"

export default function UserButtons() {
  return (
    <section className="flex items-center justify-between  space-x-4">
        <User32 className="cursor-pointer hover:text-blue-700 duration-200 transition-colors" />
        <ShoppingBag32 className="cursor-pointer hover:text-blue-700 duration-200 transition-colors" />
        <Favorite32 className="cursor-pointer hover:text-blue-700 duration-200 transition-colors" />
    </section>
  )
}

import Link from 'next/link'
import User from '@carbon/icons-react/lib/user/32'

export default function UserButtons() {
  return (
    <Link href="/user/profile">
      <a aria-label="Link to user profile">
        <User className="transition-colors duration-200 cursor-pointer hover:text-blue-700" />
      </a>
    </Link>
  )
}

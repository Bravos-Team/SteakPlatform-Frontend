import { renewUserRefreshToken } from '@/apis/user/authUser'

const guest = ({
  next,
  checkAccess,
}: {
  next: any
  checkAccess: { user: string; publisher: string }
}) => {
  if (!checkAccess.user) {
    return next({
      name: 'Home',
    })
  }
  return next()
}

export default guest

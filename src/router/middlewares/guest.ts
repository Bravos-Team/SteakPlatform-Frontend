const guest = ({ next, authStore }: { next: any; authStore: any }) => {
  if (authStore.isLogin) {
    return next({
      name: 'Home',
    })
  }
  return next()
}

export default guest

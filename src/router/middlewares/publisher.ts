const publisher = ({ next, authPublisherStore }: any) => {
  if (authPublisherStore.isLogin) {
    return next({
      name: 'PublisherHome',
    })
  }
  return next()
}

export default publisher

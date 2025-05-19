const publisher = ({ next, authPublisherStore }: any) => {
  console.log('NEXT:', next)
  return next({
    name: 'PublisherAuthLogin',
  })
}

export default publisher

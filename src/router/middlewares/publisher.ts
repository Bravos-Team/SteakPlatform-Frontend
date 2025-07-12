const publisher = ({ next, authPublisherStore }: any) => {
  return next({
    name: 'PublisherAuthLogin',
  })
}

export default publisher

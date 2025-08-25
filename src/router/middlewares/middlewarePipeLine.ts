import { MiddlewareContext } from '@/types/router/middleware'

const middlewarePipeLine = (
  context: MiddlewareContext,
  middleware: ((context: MiddlewareContext) => void)[],
  index: number,
): any => {
  // console.log('middlewarePipeLine Index', index)
  // console.log('middlewarePipeLine Context', context)
  // console.log('middlewarePipeLine Next', context.next)
  const nextMiddleWare = middleware[index]
  // console.log('next middleware', nextMiddleWare)
  if (!nextMiddleWare) return context.next
  return () => {
    const nextPipeLine = middlewarePipeLine(context, middleware, index + 1)
    nextMiddleWare({ ...context, next: nextPipeLine })
  }
}

export default middlewarePipeLine

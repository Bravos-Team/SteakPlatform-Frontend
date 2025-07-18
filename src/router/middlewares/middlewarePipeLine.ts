import { MiddlewareContext } from '@/types/router/middleware'

const middlewarePipeLine = (
  context: MiddlewareContext,
  middleware: ((context: MiddlewareContext) => void)[],
  index: number,
): any => {
  const nextMiddleWare = middleware[index]
  if (!nextMiddleWare) return context.next
  return () => {
    const nextPipeLine = middlewarePipeLine(context, middleware, index + 1)
    nextMiddleWare({ ...context, next: nextPipeLine })
  }
}

export default middlewarePipeLine

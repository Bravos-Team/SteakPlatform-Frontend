const middlewarePipeLine = (context: any, middleware: any[], index: number): any => {
  const nextMiddleWare = middleware[index]
  if (!nextMiddleWare) return context.next
  return () => {
    const nextPipeLine = middlewarePipeLine(context, middleware, index + 1)
    nextMiddleWare({ ...context, next: nextPipeLine })
  }
}

export default middlewarePipeLine

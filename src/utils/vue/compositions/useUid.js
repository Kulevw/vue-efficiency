const uidManager = () => {
  let number = 0
  return {
    inc: () => number++,
  }
}

const manager = uidManager()

export const useUid = () => {
  return manager.inc()
}

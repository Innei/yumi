import { provide, inject } from 'vue'

export interface FunctionalStore<T extends object> {
  (...args: any[]): T
  token?: symbol
}

export function useProvider<T extends object>(func: FunctionalStore<T>): T {
  !func.token && (func.token = Symbol('functional store'))
  const depends = func()
  provide(func.token, depends)
  return depends
}

export function useProviders(...funcs: FunctionalStore<any>[]) {
  return funcs.map((func) => {
    return useProvider(func)
  })
}

export function useInjector<T extends object>(func: FunctionalStore<T>) {
  const token: any = func.token
  const i = inject<T>(token)
  if (i) {
    return i
  }
  return
}

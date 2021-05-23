export class Store {
  foo = 'bar'

  setFoo() {
    this.foo = '11'
  }
}

export const createStore = <T extends { new () }>(Store: T) => {
  const store = new Store()
  Object.keys(store).map((i) => console.log(i))
}

export const store = createStore(Store)

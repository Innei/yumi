import { UniqueID } from 'nodejs-snowflake'

const uid = new UniqueID({
  returnNumber: true,
})

export const snowflake = {
  gen() {
    return uid.getUniqueID() as bigint
  },
  async genAsync() {
    return uid.asyncGetUniqueID() as Promise<bigint>
  },
}

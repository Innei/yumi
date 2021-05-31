import { UniqueID } from 'nodejs-snowflake'

const uid = new UniqueID({
  returnNumber: true,
})

export const snowflake = {
  gen() {
    return uid.getUniqueID()
  },
  async genAsync() {
    return uid.asyncGetUniqueID()
  },
}

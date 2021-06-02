import { isNil } from 'lodash'
import { UniqueID } from 'nodejs-snowflake'

const uid = new UniqueID({
  returnNumber: true,
  customEpoch: +new Date('2021/06/01'),
})

export const snowflake = {
  gen() {
    return uid.getUniqueID() as bigint
  },
  async genAsync() {
    return uid.asyncGetUniqueID() as Promise<bigint>
  },
  compare(i1, i2) {
    if (isNil(i1) || isNil(i2)) {
      return false
    }
    return i1.toString() === i2.toString()
  },
}

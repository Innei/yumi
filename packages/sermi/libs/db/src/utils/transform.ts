import { Snowflake } from '../models/base.model'
import { Long } from 'mongodb'
export const transformer = {
  snowflake: {
    get: (val: Long) => val.toString(),
    set: (val: Snowflake) => Long.fromString(val.toString()),
  },
  snowflakes: {
    get: (arr: Long[]) => arr.map((i) => i.toString()),
    set: (arr: Snowflake[]) => arr.map((i) => Long.fromString(i.toString())),
  },
  bigint: {
    get: (val: Long) => BigInt(val.toString()),
    set: (val: bigint) => Long.fromString(val.toString()),
  },
  nullableSnowflake: {
    get: (val: Long | null) => (val ? val.toString() : null),
    set: (val: Snowflake | null) =>
      val ? Long.fromString(val.toString()) : null,
  },
  nullableSnowflakes: {
    get: (arr: Long[] | null) => (arr ? arr.map((i) => i.toString()) : null),
    set: (arr: Snowflake[] | null) =>
      arr ? arr.map((i) => Long.fromString(i.toString())) : null,
  },
}

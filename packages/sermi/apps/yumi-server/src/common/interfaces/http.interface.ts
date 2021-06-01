/**
 * HTTP interface.
 * @file HTTP 响应接口模型
 * @module interface/http
 * @author Surmon <https://github.com/surmon-china>
 * @author Innei
 */

// 响应状态
export enum EHttpStatus {
  Error = 'error',
  Success = 'success',
}

export type TMessage = string
export type TExceptionOption =
  | TMessage
  | {
      message: TMessage
      error?: any
    }

export type TExceptionResponse = {
  ok: 0
  message: TMessage
  // TODO
  code?: any
}

// 翻页数据
export interface IHttpResultPaginate<T> {
  data: T
  params: any
  pagination: {
    total: number
    current_page: number
    total_page: number
    per_page: number
  }
}

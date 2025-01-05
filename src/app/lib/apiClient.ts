import { cookies } from 'next/headers'

import config from '@/app/lib/config'
import { fromDate } from '@internationalized/date'

const DEFAULT_TIMEOUT = 120000
const DEFAULT_RETRIES = 3
const DEFAULT_RETRY_DELAY = 1000

export interface SuccessResponse<T> {
  status: number
  message: string
  records?: T
  [key: string]: unknown
}

export interface ErrorResponse {
  status: number
  message: string
  error?: string
  details?: ErrorDetail[]
  [key: string]: unknown
}

interface ErrorDetail {
  field: string
  message: string
  [key: string]: unknown
}

// APIレスポンスの型
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

// APIから明示的にエラーが返された場合はエラー詳細を保持する
export class ApiError extends Error {
  public details?: ErrorDetail[]

  constructor(public response: ErrorResponse) {
    super(response.message || 'An error occurred')
    this.name = 'ApiError'
    this.details = response.details
  }
}

// リクエストオプションの型
export interface RequestOptions extends RequestInit {
  timeout?: number
  retries?: number
  retryDelay?: number
}

// APIクライアントクラス
class ApiClient {
  private readonly baseUrl: string

  constructor(baseUrl: string = config.apiBaseUrl) {
    this.baseUrl = baseUrl
  }

  // 共通のフェッチ関数
  private async fetchWithErrorHandling(url: string, options: RequestOptions = {}): Promise<Response> {
    console.log(this.baseUrl)
    const {
      timeout = DEFAULT_TIMEOUT,
      retries = DEFAULT_RETRIES,
      retryDelay = DEFAULT_RETRY_DELAY,
      ...fetchOptions
    } = options

    // タイムアウトの設定
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await this.fetchWithRetry(url, {
        ...fetchOptions,
        signal: controller.signal,
        retries,
        retryDelay,
      })

      clearTimeout(timeoutId)

      return response
    } catch (error) {
      throw this.fetchHandleError(error)
    } finally {
      clearTimeout(timeoutId)
    }
  }

  // フェッチ処理のエラーハンドリング
  private fetchHandleError(error: unknown): Error {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return new Error('Request timed out')
      }
      return error
    }
    return new Error('An unknown error occurred')
  }

  // リトライロジックを含むフェッチ関数
  private async fetchWithRetry(url: string, options: RequestOptions): Promise<Response> {
    const { retries = DEFAULT_RETRIES, retryDelay = DEFAULT_RETRY_DELAY, ...fetchOptions } = options
    for (let i = 0; i < retries; i++) {
      // 念のため既にabortしてないか確認
      if (fetchOptions.signal?.aborted) {
        throw new Error('Request was aborted')
      }
      try {
        const response = await fetch(url, fetchOptions)
        if (!config.isProduction || !config.isAppProduction) {
          console.log(url, fetchOptions)
        }
        if (response.ok) return response

        // リトライ可能なステータスコードでなければ返却
        if (response.status !== 502 && response.status !== 503 && response.status !== 504 && response.status !== 429) {
          return response
        }
      } catch (error) {
        if (i === retries - 1) throw error
      }

      await new Promise((resolve) => setTimeout(resolve, retryDelay * Math.pow(2, i))) // 指数バックオフ
    }

    throw new Error(`Max retries reached after ${retries} attempts`)
  }

  private createUrl(path: string, params?: Record<string, unknown>): string {
    const url = new URL(this.baseUrl + path)
    if (process.env.NEXT_PUBLIC_APP_ENV === 'local') {
      url.port = '80'
    }

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value))
        }
      })
    }
    return url.toString()
  }

  private async request<T>(
    method: string,
    path: string,
    params?: Record<string, unknown> | Array<T>,
    options?: RequestOptions
  ): Promise<SuccessResponse<T>> {
    const url = this.createUrl(path, method === 'GET' ? (params as Record<string, unknown>) : undefined)

    // const token = cookies().get('token')?.value // TODO：仮実装（クッキーからトークン取得）
    const fetchOptions: RequestOptions = {
      ...options,
      method,
      headers: {
        // Authorization: `Bearer ${token}`,
        ...options?.headers,
      },
    }

    if (method === 'GET') {
      fetchOptions.headers = {
        'Cache-Control': 'no-cache',
        ...fetchOptions.headers,
      }
    } else if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
      if (params !== undefined) {
        fetchOptions.body = JSON.stringify(params)
        fetchOptions.headers = {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        }
      }
    }

    const response = await this.fetchWithErrorHandling(url, fetchOptions)

    let jsonResponse: ApiResponse<T>

    try {
      jsonResponse = (await response.json()) as ApiResponse<T>
    } catch (error) {
      // エラーの場合に細かく情報を返す
      const errorDetails = {
        url: url,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        error: error instanceof Error ? error.message : String(error),
      }

      // レスポンスの本文を完全な形で取得
      let rawBody = ''
      try {
        rawBody = await response.clone().text()
      } catch (e) {
        rawBody = 'Failed to read response body'
      }

      throw new Error(
        `Invalid JSON response: ` +
          `URL=${errorDetails.url}, ` +
          `Status=${errorDetails.status} ${errorDetails.statusText}, ` +
          `Content-Type=${errorDetails.headers['content-type'] || 'not set'}, ` +
          `Error=${errorDetails.error}, ` +
          `Raw response=${rawBody}`
      )
    }

    if (!config.isProduction) {
      console.log('api response:', jsonResponse)
    }

    if (!response.ok || jsonResponse.status < 200 || jsonResponse.status >= 300) {
      if (config.isProduction && !config.isAppProduction) {
        console.log('api response:', jsonResponse)
      }
      throw new ApiError(jsonResponse)
    }

    return jsonResponse
  }

  // GET リクエスト
  async get<T>(path: string, params?: Record<string, unknown>, options?: RequestOptions): Promise<SuccessResponse<T>> {
    return this.request<T>('GET', path, params, options)
  }

  // POST リクエスト
  async post<T>(
    path: string,
    params?: Record<string, unknown> | Array<T>,
    options?: RequestOptions
  ): Promise<SuccessResponse<T>> {
    return this.request<T>('POST', path, params, options)
  }

  // PUT リクエスト
  async put<T>(
    path: string,
    params?: Record<string, unknown> | Array<T>,
    options?: RequestOptions
  ): Promise<SuccessResponse<T>> {
    return this.request<T>('PUT', path, params, options)
  }

  // PATCH リクエスト
  async patch<T>(
    path: string,
    params?: Record<string, unknown> | Array<T>,
    options?: RequestOptions
  ): Promise<SuccessResponse<T>> {
    return this.request<T>('PATCH', path, params, options)
  }

  // DELETE リクエスト
  async delete<T>(
    path: string,
    params?: Record<string, unknown> | Array<T>,
    options?: RequestOptions
  ): Promise<SuccessResponse<T>> {
    return this.request<T>('DELETE', path, params, options)
  }

  async uploadImage(
    path: string,
    file: any,
    options?: RequestOptions
  ): Promise<SuccessResponse<string>> {
    const formData = new FormData()

    file.images.forEach((imageFile: any) => {
      formData.append('files', imageFile)
    })

    formData.append('image_type', file.image_type.toString())
    console.log(formData)

    const fetchOptions: RequestOptions = {
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        ...options?.headers,
        // Content-Type はブラウザが自動で設定するので省略
      },
    }
  
    const response = await this.fetchWithErrorHandling(this.createUrl(path), fetchOptions)
  
    let jsonResponse: ApiResponse<string>
    try {
      jsonResponse = (await response.json()) as ApiResponse<string>
    } catch (error) {
      throw new Error('Failed to parse JSON response from image upload API.')
    }
  
    if (!response.ok || jsonResponse.status < 200 || jsonResponse.status >= 300) {
      throw new ApiError(jsonResponse)
    }
  
    return jsonResponse
  }

}

// APIクライアントのインスタンスを作成
const apiClient = new ApiClient()

export default apiClient

import axios, { AxiosProgressEvent } from 'axios'

export interface IFile {
  key: string
  file: File
}

export interface IAttachmentResponse {
  code: string
  seq: number
  id: string
  originalFileName: string
  physicalFileName: string
  size: number
  fileType: string
  isDelete: boolean
  createDate: Date
  downloadCnt: number
  entityId: string
  entityName: string
}

export type UploadPayload = {
  fileList?: IFile[]
  attachmentCode?: string
  // info?: UploadInfoReqeust
  // list?: AttachmentSavePayload[]
}

const UPLOAD_API = '/api/v1/attachments'
const DOWNLOAD_API = `/api/v1/download`

let fileHeader = {
  'Content-Type': 'multipart/form-data',
}

interface DownloadLink {
  link?: HTMLAnchorElement
}

/**
 * 파일 업로드 서비스
 */
export const fileService = {
  upload: async ({ fileList, attachmentCode }: UploadPayload, onProgress?: (percent: number) => void) => {
    let formData = new FormData()

    fileList?.map(item => {
      formData.append('files', item.file)
    })

    // attachmentCode가 있는 경우 update라고 본다
    if (attachmentCode) {
      return axios.put(`${UPLOAD_API}/upload/${attachmentCode}`, formData, {
        headers: fileHeader,
      })
    }

    return axios.post(`${UPLOAD_API}/upload`, formData, {
      headers: fileHeader,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          if (onProgress) {
            onProgress(progress)
          }
        }
      },
    })
  },
  deleteAll: (attachmentCode: string) =>
    axios.delete(`${UPLOAD_API}/${attachmentCode}`),
  delete: (fileId: string) =>
    axios.delete(`${UPLOAD_API}/fileId?=${fileId}`),
  download: (id: string) => { // 첨부파일 다운로드 - 삭제 파일 불가
    axios.get(`${DOWNLOAD_API}/${id}`, {
      responseType: 'blob',
    })
      .then(response =>{
        const downloadFileName = decodeURIComponent(response.headers['content-disposition'].replace('attachment; filename*=UTF-8\'\'', ''))

        const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }))
        let link: HTMLAnchorElement = document.createElement('a')
        link.href = url
        link.setAttribute('download', downloadFileName)
        document.body.appendChild(link)
        link.click()

        const element: DownloadLink = { link }
        delete element?.link
      })
  },
}
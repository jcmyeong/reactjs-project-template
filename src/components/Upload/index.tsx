import React, { createContext, useImperativeHandle, useState } from 'react'
import AttachFileUpload from './AttachFileUpload'
import { IFile, IAttachmentResponse, fileService } from '@/services/file'
import { FILE_UPDATE_MAX_ALLOW_SIZE } from '@/constants'
import AttachFileList from './AttachFileList'
import { useCommonPopup } from '@/hooks/useCommonPopup'
import loadImage from 'blueimp-load-image'
import { formatBytes } from '@/utils'
import { styled } from 'styled-components'

type TFileUploadError = {
  code: string
  message: string
}

type ImageResizeResult = IFile | TFileUploadError

export type UploadType = {
  isModified: (list?: any[]) => Promise<boolean>
  count: (list?: any[]) => Promise<number>
  upload: (type: string) => Promise<any> // 파일 업로드 처리
}
//TFileUploadType
export interface FileUploadProps {
  type: string // 업로드 유형 (IMAGE or ATTACH_FILE)
  accept?: string // 업로드 허용 파일 mine type
  acceptText?: string // 업로드 허용 파일 설명 문구
  multi?: boolean // 멀티 업로드 여부
  uploadLimitCount?: number // 업로드 파일 제한 개수
  uploadLimitSize?: number // 업로드 파일 제한 사이즈
  fileData?: any[] // 저장된 첨부 파일 목록
  onUpdateError?: (error: TFileUploadError) => void // 업로드 에러 처리
  onFileDeleted?: (fileId: string) => void // 기존 파일 삭제 관련 이벤트
  styleType?: string
}

export const FileContext = createContext<{
  selectedFiles: IFile[] | undefined
  selectedFilesHandler: (files: IFile[]) => void
}>({
  selectedFiles: undefined,
  selectedFilesHandler: () => {},
})

const Upload = React.forwardRef<UploadType, FileUploadProps>((props, ref) => {
  const { type, uploadLimitCount, uploadLimitSize, fileData, onUpdateError, onFileDeleted, styleType } = props

  const { showAlert } = useCommonPopup()

  // 기본값 업로드 용량 제한 설정
  let _uploadLimitSize = uploadLimitSize!!
  if (!_uploadLimitSize) {
    _uploadLimitSize = FILE_UPDATE_MAX_ALLOW_SIZE
  }

  // 기존 파일 삭제처리를 위한 목록
  const [spareFiles, setSpareFiles] = useState<IAttachmentResponse[]>([])
  // 업로드를 위한 파일 목록
  const [selectedFiles, setSelectedFiles] = useState<IFile[] | undefined>(undefined)
  const selectedFilesHandler = (files: IFile[]) => {
    //console.log(files)

    // 파일 수 체크
    const uploadCount = fileData?.length ?? 0 + files.length
    if (uploadLimitCount && uploadCount > uploadLimitCount) {
      showAlert({
        message: '파일 업로드 허용 갯수를 초과하였습니다!',
      })
      return
    }

    // 용량 체크
    if (uploadLimitCount) {
      const uploadSize = files.reduce((accumulator, currentValue) => accumulator + currentValue.file.size, 0)
      if (uploadSize > _uploadLimitSize) {
        showAlert({
          message: '파일 업로드 허용 용량을 초과하였습니다!',
        })
        return
      }
    }

    setSelectedFiles(files)
  }

  // 업로드 진행 상황 상태 관리
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  /**
   * 삭제 버튼 이벤트 처리
   *
   * @param fileId 삭제할 파일아이디
   */
  const handleDeleted = (fileId: string) => {
    //console.log(fileId)

    if (type === 'IMAGE') {
      // 파일 삭제 API 호출
      fileService.delete(fileId)
        .then((response: any) => {
          // 부모 Component 삭제 통보
          if (onFileDeleted) {
            onFileDeleted(fileId)
          }
        })
        .catch((error: unknown) => {
          console.error(error)
          showAlert({
            message: '시스템 오류가 발생하였습니다.',
          })
        })
    } else {
      // 첨부파일
      const deleteFile = fileData?.find(item => item.id === fileId)
      if (deleteFile) {
        setSpareFiles([...spareFiles, deleteFile])

        // 부모 Component 삭제 통보
        if (onFileDeleted) {
          onFileDeleted(deleteFile.id)
        }
      } else {
        // TODO: 파일 정보 없을 때 처리 필요
        showAlert({
          message: '삭제할 파일이 없습니다.',
        })
      }
    }
  }

  useImperativeHandle(ref, () => ({
    isModified: (list?: any[]) =>
      new Promise<boolean>(resolve => {
        if (selectedFiles && selectedFiles?.length > 0) {
          resolve(true)
        }
        resolve(false)
      }),
    count: (list?: any[]) =>
      new Promise<number>(resolve => {
        resolve(
          selectedFiles?.length ? selectedFiles?.length : 0,
          // (list ? list.filter(m => !m.isDelete).length : 0),
        )
      }),
    upload: (type: string) =>
      new Promise<any>((resolve, reject) => {
        // 기존 파일 삭제
        if (spareFiles) {
          spareFiles?.forEach(item => {
            void fileService.delete(item.id)
          })
          setSpareFiles([])
        }

        // 이미지 리사이즈 처리
        const convertImageResize = async (fileObj: IFile): Promise<ImageResizeResult> => {
          return new Promise<ImageResizeResult>((resolve, reject) => {
            loadImage(fileObj.file, {
              orientation: true,
              meta: true,
              maxWidth: 600,
              canvas: true,
              // crop: true,
              //aspectRatio: 16_9
            }).then((data: any) => {
              try {
                const image = data.image as HTMLCanvasElement
                image.toBlob((blob: Blob | null) => {
                  const newFile = new File([blob as any], fileObj.file.name!!, {
                    type: fileObj.file?.type,
                    lastModified: fileObj.file?.lastModified,
                  })
                  //console.log(newFile)
                  fileObj.file = newFile
                  resolve(fileObj)
                })
              } catch (error) {
                reject({
                  code: 'ETC',
                  message: '이미지 업로드에 실패했습니다.\n서비스 이용에 불편을 드려 죄송합니다.\n다시 시도해주세요',
                })
              }
            })
          })
        }

        // 파일 업로드 처리
        if (selectedFiles) {
          // 업로드 유형이 이미지 파일이면 파일 리사이즈 처리
          if (type === 'IMAGE' || 'LOGO') {
            //console.log('1) Before : ', selectedFiles)
            //const fileUploadResults: FileUploadResponse[] = []
            // 서버 오류 메시지
            let errorMessage =
              '이미지 파일 업로드에 실패했습니다.\n서비스 이용에 불편을 드려 죄송합니다.\n다시 시도해주세요'

            // 이미지 사이즈 관련 에러 메시지
            const displaySize = formatBytes(FILE_UPDATE_MAX_ALLOW_SIZE).replace(/\s/g, '') // 공백문자 제거
            const sizeErrorMessage = `이미지 파일 업로드에 실패했습니다.\n사진 크기가 ${displaySize}이상이거나,\n파일명이 유효하지 않을 수 있습니다.`

            selectedFiles.forEach(async (fileObj: IFile) => {
              try {
                const result = await convertImageResize(fileObj)
                console.log('convertImageResize : ', result)

                const resizeFile = result as IFile
                if (resizeFile) {
                  fileObj.file = resizeFile?.file
                }
              } catch (error) {
                const _error = error as TFileUploadError
                reject({
                  code: _error?.code,
                  message: _error?.message,
                })
                return
              }
            })
            //console.log('2) After : ', selectedFiles)

            fileService.upload({
              fileList: selectedFiles,
            }, (percent) => setUploadProgress(percent))
              .then(response => {
                const fileData = response.data?.mediaFile ?? undefined
                if (!fileData) {
                  if (onUpdateError) {
                    onUpdateError({
                      code: 'ETC',
                      message: errorMessage,
                    })
                  }
                  reject({
                    code: 'ETC',
                    message: errorMessage,
                  })
                  return
                }
                setSelectedFiles(undefined)
                resolve(response.data)
              })
              .catch(error => {
                console.error(error)
                setSelectedFiles(undefined)
                if (onUpdateError) {
                  onUpdateError({
                    code: 'ETC',
                    message: sizeErrorMessage,
                  })
                }
                reject(error)
              })
          } else {
            // 서버 오류 메시지
            let errorMessage =
              '첨부파일 업로드에 실패했습니다.\n서비스 이용에 불편을 드려 죄송합니다.\n다시 시도해주세요'
            fileService.upload({
              fileList: selectedFiles,
            }, (percent) => setUploadProgress(percent))
              .then(response => {
                const fileData = response.data?.mediaFile ?? undefined
                if (!fileData) {
                  if (onUpdateError) {
                    onUpdateError({
                      code: 'ETC',
                      message: errorMessage,
                    })
                  }
                  reject({
                    code: 'ETC',
                    message: errorMessage,
                  })
                  return
                }
                setSelectedFiles(undefined)
                resolve(response.data)
              })
              .catch(error => {
                setSelectedFiles(undefined)
                if (onUpdateError) {
                  onUpdateError({
                    code: 'ETC',
                    message: errorMessage,
                  })
                }
                reject(error)
              })
          }
        }
      }),
  }))

  // 업로드 유형에 따른 Child Component 분기
  return (
    <div>
      <FileContext.Provider value={{ selectedFiles, selectedFilesHandler }}>
        <AttachFileUpload {...props} styleType={styleType} />
        <AttachFileList attachData={fileData} onDeleted={handleDeleted} styleType={styleType} />
        {/* 업로드 진행 상황을 나타내는 프로그레스 바 */}
        <ProgressBar width={uploadProgress} />
      </FileContext.Provider>
    </div>
  )
})

const ProgressBar = styled.div<{ width: number }>`
  /* 업로드 진행 상태를 나타내는 프로그레스 바에 대한 스타일 */
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${(props) => props.width || 0}%;
  height: 3px;
  background-color: #007bff;
  transition: width 0.3s ease;
`

export default Upload

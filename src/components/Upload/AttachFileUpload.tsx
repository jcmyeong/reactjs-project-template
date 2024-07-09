import React, { useContext, useRef, useState } from 'react'
import { FileContext, FileUploadProps } from '.'
import { DEFAULT_ACCEPT_FILE_EXT } from '@/constants'
import { IFile } from '@/services/file'
import classNames from 'classnames'
import { styled } from 'styled-components'

interface AttachFileUploadProps extends FileUploadProps {}

/**
 * 첨부파일 업로드 공통 Component
 */
const AttachFileUpload = (props: AttachFileUploadProps) => {
  const { accept, multi, styleType } = props

  const fileInputRef = useRef<HTMLInputElement>(null)
  //const [fileName, setFileName] = useState<string>('')
  const { selectedFiles, selectedFilesHandler } = useContext(FileContext)

  // 선택된 업로드 파일이 변경되었을 때 이벤트 처리
  const handleChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    //console.log(fileList)
    let newSelectedFiles: IFile[] = []

    for (const key in fileList) {
      if (Object.prototype.hasOwnProperty.call(fileList, key)) {
        //@ts-ignore
        const item = fileList[key]
        //console.log(item)
        //setFileName(item.name)
        newSelectedFiles.push({
          key: `${Math.random().toString(36).substr(2, 11)}`,
          file: item,
        })
      }
    }

    if (selectedFiles !== undefined) {
      newSelectedFiles = newSelectedFiles.concat(selectedFiles)
    }

    selectedFilesHandler(newSelectedFiles)
  }

  // 파일명 라벨 클릭 시 이벤트
  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault()
    fileInputRef.current?.click()
  }

  return (
    <Wrapper className={classNames({ portfolio: styleType === 'portfolio' })}>
      <FileBox>
        <input
          type="file"
          ref={fileInputRef}
          accept={accept || DEFAULT_ACCEPT_FILE_EXT}
          onChange={handleChangeFiles}
          multiple={multi}
          id="file-input"
        />
        <input
          type="text"
          className="file-name-label"
          readOnly
          placeholder="첨부파일을 등록해주세요"
          // value={fileName}
          onClick={handleInputClick}
        />
        <SelectFileLabel htmlFor="file-input">파일 찾기</SelectFileLabel>
      </FileBox>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  &.portfolio {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`
const FileBox = styled.div`
  position: relative;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;

  /** 파일명 라벨 */
  > input.file-name-label {
    cursor: auto;
    border: 0;
    width: 100%;
    height: 43px;
    background-color: var(--color-white);
    color: gray;
    padding: 0 10px;
    box-sizing: border-box;
  }

  > input[type='file'] {
    display: none;
  }

  &.mobile {
    grid-column: auto !important;
    grid-row: auto !important;
  }
`

const SelectFileLabel = styled.label`
  padding: 14px 25px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #3559ab;
  cursor: pointer;
  font-family: NEXONLv2Gothic;
  font-size: 14px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    background-color: #0056b3;
  }
`

export default AttachFileUpload

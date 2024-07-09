import React, { useContext, useEffect, useState } from 'react'
import { FileContext } from '.'
import { IAttachmentResponse } from '@/services/file'
import { produce } from 'immer'
import { XCircleIcon } from '@/global/styles/Icon'
import { Theme, createStyles, makeStyles } from '@material-ui/core'
import classNames from 'classnames'
import { styled } from 'styled-components'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: '1px',
      marginBottom: '-10px',
      padding: 0,
    },
    list: {
      display: 'flex',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(0),
    },
  }),
)

interface AttachFileProps {
  attachData?: IAttachmentResponse[]
  onDeleted: (fileId: string) => void
  styleType?: string // 리스트 표출 타입
}

interface IFileList {
  key: string
  name: string
  size: number
  fileId?: string // 파일아이디
}

/**
 * 첨부파일 목록 Components
 */
const AttachFileList = (props: AttachFileProps) => {
  const classes = useStyles()
  const { attachData, onDeleted, styleType } = props

  const { selectedFiles, selectedFilesHandler } = useContext(FileContext)
  const [fileList, setFileList] = useState<IFileList[]>([])

  useEffect(() => {
    let list: IFileList[] = []
    for (const key in selectedFiles) {
      if (Object.prototype.hasOwnProperty.call(selectedFiles, key)) {
        //@ts-ignore
        const item = selectedFiles[key]
        list.push({
          key: item.key,
          name: item.file.name,
          size: item.file.size,
        })
      }
    }

    setFileList(list)
  }, [selectedFiles])

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, key: string, fileId?: string) => {
    event.preventDefault()

    // 기존 파일 삭제 처리
    if (fileId) {
      const index = fileList?.findIndex(item => item.key === key)
      const newFiles = produce(fileList, draft => {
        draft?.splice(index, 1)
      })
      setFileList(newFiles)
      onDeleted(fileId)
    } else {
      const index = selectedFiles?.findIndex(item => item.key === key)!!
      // 신규 파일에 대한 처리
      const newFiles = produce(selectedFiles, draft => {
        draft?.splice(index, 1)
      })
      selectedFilesHandler(newFiles!!)
    }
  }

  //const mounted = useMounted()

  useEffect(() => {
    if (attachData) {
      let list: IFileList[] = []
      attachData?.forEach((item: IMediaFile) => {
        list.push({
          key: `${Math.random().toString(36).substr(2, 11)}`,
          name: item.originalName,
          size: item.size,
          fileId: item.id,
        })
      })
      setFileList(list)
    }
  }, [attachData])

  return (
    <div className={classes.root}>
      {/* TODO: Grid 스타일 적용 필요! */}
      {fileList && (
        <ListView className={classNames(`${classes.list}`, { portfolio: styleType === 'portfolio' })}>
          {styleType === 'portfolio'
            ? fileList.map((item: any, idx: number) => (
                <BlueBox key={item.key}>
                  <p>{item.name}</p>
                  <button onClick={event => handleDelete(event, item.key, item.fileId)}>
                    <XCircleIcon />
                  </button>
                </BlueBox>
              ))
            : fileList.map(item => (
                <ListItem key={item.key}>
                  <ListItemText>{item.name}</ListItemText>
                  <IconButton align="right" onClick={event => handleDelete(event, item.key, item.fileId)}>
                    <XCircleIcon />
                  </IconButton>
                </ListItem>
              ))}
        </ListView>
      )}
    </div>
  )
}
/** 포트폴리오 리스트 아이템 */
const BlueBox = styled.div`
  position: relative;
  padding: 15px 45px 15px 15px;
  color: #586472;
  background-color: #f2f4f8;
  border-radius: 5px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 900;
  font-size: 14px;
  line-height: 16px;

  > p {
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 900;
    font-size: 14px;
    line-height: 16px;
  }
  > button {
    position: absolute;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 7px;
    top: calc(50% - 15px);
  }
`
/** TODO: 공통 스타일 또는 Component 모듈로 분리 요망! */
const ListView = styled.div`
  width: 100%;
  margin-top: 15px;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;

  &.portfolio {
    width: 100%;
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10px;
  }
`
/** TODO: 공통 스타일 또는 Component 모듈로 분리 요망! */
const ListItem = styled.div`
  display: inline-block;
  height: 35px;
  box-sizing: border-box;
  border: 1px solid #586472;
  background-color: var(--color-white);
  border-radius: 5px;
  padding: 10px 10px 10px 0px;
  position: relative;
  font-weight: 700;
  font-size: 14px;
  color: #586472;
`
/** TODO: 공통 스타일 또는 Component 모듈로 분리 요망! */
const ListItemText = styled.span`
  margin-right: auto;
  padding: 0 10px;
  height: 100%;
  justify-content: center;
  align-items: center;
`
/** TODO: 공통 스타일 또는 Component 모듈로 분리 요망! */
const IconButton = styled.button<{ align: string }>`
  float: ${props => props.align || 'left'};
`

export default AttachFileList

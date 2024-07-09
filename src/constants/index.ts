
/** 사이트 명 */
export const DEFAULT_APP_NAME = 'React Project Template'

/** 공통 게시판 페이지 (페이징 당 데이터 제한 개수) */
export const DEFAULT_BBS_PAGE_SIZE = 10

/** 공통 게시판 > 한 화면에 나타날 페이지 버튼의 개수*/
export const DEFAULT_BBS_PAGE_COUNT = 5

/** Editor 콘텐츠 작성시 Max Length */
export const EDITOR_MAX_LENGTH = 2000

/** 파일 업로드 가능 mine-type */
// .htm, .html, .txt, .png/.jpg/etc, .pdf, .xlsx. .xls
export const DEFAULT_ACCEPT_FILE_EXT =
  'text/html, text/plain, image/*, .pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'

export const DEFAULT_ACCEPT_IMG_FILE_EXT =
  'image/png, image/jpeg, image/jpg'

/** 파일 업로드 가능 확장자 */
export const DEFAULT_ACCEPT_FILE_EXT_TEXT =
  '.htm, .html, .txt, .png/.jpg/etc, .pdf, .xlsx. .xls'

export const DEFAULT_ACCEPT_IMG_FILE_EXT_TEXT =
  '.png,.jpg,.jpeg'

/** 파일 업로드 최대 사이즈 (12MB) */
export const FILE_UPDATE_MAX_ALLOW_SIZE = 12582912

export const CUSTOM_HEADER_CLIENT_ID_KEY = 'clientId'
export const CUSTOM_HEADER_PLATFORM_KEY = 'platform'

/** 로그인 페이지 경로 */
export const LOGIN_PAGE_PATH = '/auth/login'

/** 인증 없이 접근 가능한 페이지 */
export const PUBLIC_PAGES = [
  '/404',
  '/',
  '/sample',
  // '/reload',
  // '/_error',
  // '/user/leave/bye',
  '#',
  // '/auth/login/naver',
]

/** API 요청 타임아웃 값 (단위: ms) */
export const API_REQUEST_TIMEOUT = 30000

/** 일자 포멧팅 문자열 기본값 */
export const DEFAULT_DATE_FORMAT = 'yyyy-MM-DD'
/** 일시 포멧팅 문자열 기본값 */
export const DEFAULT_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
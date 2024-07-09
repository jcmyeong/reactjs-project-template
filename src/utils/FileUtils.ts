/**
 * 파일 용량 포멧팅 문자열 생성
 * 
 * @param bytes 입력한 파일 크기 (단위 바이트)
 * @param decimal 소수점 자리수 (Optional, 기본값: 0)
 * @returns 
 */
export const formatBytes = (bytes: number, decimal?: number): string => {
  const marker = 1024; // Change to 1000 if required
  const kiloBytes = marker; // One Kilobyte is 1024 bytes
  const megaBytes = marker * marker; // One MB is 1024 KB
  const gigaBytes = marker * marker * marker; // One GB is 1024 MB

  // return bytes if less than a KB
  if(bytes < kiloBytes) return bytes + " Bytes";
  // return KB if less than a MB
  else if(bytes < megaBytes) return(bytes / kiloBytes).toFixed(decimal) + " KB";
  // return MB if less than a GB
  else if(bytes < gigaBytes) return(bytes / megaBytes).toFixed(decimal) + " MB";
  // return GB if less than a TB
  else return(bytes / gigaBytes).toFixed(decimal) + " GB";
}


'use client';

/**
 * 이미지를 base64 형태로 생성
 * @example
 * const url = await createBase64Image(file);
 */
export function createBase64Image<T extends File>(file: T) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (reader.result) {
        resolve(reader.result);
      } else {
        reject(new Error('Error'));
      }
    });
    reader.readAsDataURL(file);
  });
}

/**
 * 파일 다운로드
 * @example
 * const resp = await fetch(`/api/...`, { ... })
 * const blob = await resp.blob();
 * await downloadFile(`fileName.ext`, blob);
 */
export async function downloadFile(name: string, data: BlobPart) {
  const url = window.URL.createObjectURL(new Blob([data]));
  let link: HTMLAnchorElement | null;
  link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  link = null;
  window.URL.revokeObjectURL(url);
}

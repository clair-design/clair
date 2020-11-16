import { isFileTypeAccepted } from './isFileTypeAccepted'

it('only accept `.png`, `.jpg`, `.gif`', () => {
  const isFileImg = isFileTypeAccepted(['.png', '.jpg', '.gif'])
  const pngFile = new File([new Blob()], 'image.png', { type: 'image/png' })
  const jpgFile = new File([new Blob()], 'image.jpg', { type: 'image/jpg' })
  const gifFile = new File([new Blob()], 'image.gif', { type: 'image/gif' })
  const svgFile = new File([new Blob()], 'image.svg', { type: 'image/svg' })
  expect(isFileImg(pngFile)).toBeTruthy()
  expect(isFileImg(jpgFile)).toBeTruthy()
  expect(isFileImg(gifFile)).toBeTruthy()
  expect(isFileImg(svgFile)).toBeFalsy()
})

it('only accept `image/*`', () => {
  const isFileImg = isFileTypeAccepted(['image/*'])
  const pngFile = new File([new Blob()], 'image.png', { type: 'image/png' })
  const pdfFile = new File([new Blob()], 'ts.pdf', { type: 'application/pdf' })
  expect(isFileImg(pngFile)).toBeTruthy()
  expect(isFileImg(pdfFile)).toBeFalsy()
})

it('only accept `image/png` `application/pdf` `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`', () => {
  const isFileImg = isFileTypeAccepted([
    'image/png',
    'application/pdf',
    `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
  ])
  const pngFile = new File([new Blob()], 'image.png', { type: 'image/png' })
  const pdfFile = new File([new Blob()], 'ts.pdf', { type: 'application/pdf' })
  const xlsxFile = new File([new Blob()], '文件.xlsx', {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
  const textFile = new File([new Blob()], 'ts.pdf', { type: 'text/plain' })
  expect(isFileImg(pngFile)).toBeTruthy()
  expect(isFileImg(pdfFile)).toBeTruthy()
  expect(isFileImg(xlsxFile)).toBeTruthy()
  expect(isFileImg(textFile)).toBeFalsy()
})

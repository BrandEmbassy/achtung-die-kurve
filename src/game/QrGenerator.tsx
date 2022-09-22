import { QRCodeCanvas } from 'qrcode.react'
import React from 'react'
//import QRCode from 'react-qr-code'

export const QrGenerator = ({ url }) => {
  return (
    <div>
      <QRCodeCanvas
        /* size={128} */
        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        value={url}
      />
    </div>
  )
}

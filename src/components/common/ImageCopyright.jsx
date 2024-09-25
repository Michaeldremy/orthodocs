import React from 'react'
import clsx from 'clsx'
import styles from './ImageCopyright.module.css'

const ImageCopyright = ({
  copyrightText,
  href,
  includeImageLink,
  hrefText,
}) => {
  return (
    <div className={clsx('flex italicFont', styles.textSize)}>
      <p>{copyrightText}&nbsp;</p>
      {includeImageLink && (
        <a href={href} target='_blank'>
          {hrefText ? hrefText : 'Image Source'}
        </a>
      )}
    </div>
  )
}

export default ImageCopyright

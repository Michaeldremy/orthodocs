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
    <div className={clsx('flex italicFont')}>
      <p className={styles.paragraphTextSize}>{copyrightText}&nbsp;</p>
      {includeImageLink && (
        <a href={href} target='_blank' className={styles.aTagTextSize}>
          {hrefText ? hrefText : 'Image Source'}
        </a>
      )}
    </div>
  )
}

export default ImageCopyright

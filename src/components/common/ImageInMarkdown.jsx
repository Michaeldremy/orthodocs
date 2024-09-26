import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'

const ImageInMarkdown = ({ src, alt, width, height, className = '' }) => {
  const imageSrc = useBaseUrl(src)

  const handleClick = () => {
    window.open(imageSrc, '_blank')
  }

  return (
    <div className='my-4'>
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className}`}
        style={{ objectFit: 'cover', cursor: 'pointer' }}
        onClick={handleClick}
      />
    </div>
  )
}

export default ImageInMarkdown

import React from 'react'

const ImageInMarkdown = ({ src, alt, width, height, className = '' }) => {
  const handleClick = () => {
    window.open(src, '_blank')
  }

  return (
    <div className='my-4'>
      <img
        src={src}
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

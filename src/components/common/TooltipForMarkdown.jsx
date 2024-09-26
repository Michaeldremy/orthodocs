import React, { useState, useRef, useCallback } from 'react'
import { FaLightbulb } from 'react-icons/fa'
import styles from './TooltipForMarkdown.module.css'

const TooltipForMarkdown = ({
  children,
  referenceWord,
  content,
  sourceLink,
  sourceName,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef(null)

  const showTooltip = useCallback(() => {
    clearTimeout(timeoutRef.current)
    setIsVisible(true)
  }, [])

  const hideTooltip = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 300) // 300ms delay before hiding
  }, [])

  return (
    <span
      className={styles.tooltipWrapper}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <FaLightbulb className={styles.lightbulb} />
      {isVisible && (
        <div
          className={styles.tooltipContent}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {referenceWord && (
            <h4 className={styles.referenceWord}>{referenceWord}</h4>
          )}
          <p>{content}</p>
          {sourceLink && (
            <a
              href={sourceLink}
              target='_blank'
              rel='noopener noreferrer'
              onClick={e => e.stopPropagation()}
            >
              {sourceName || 'Link'}
            </a>
          )}
        </div>
      )}
    </span>
  )
}

export default TooltipForMarkdown

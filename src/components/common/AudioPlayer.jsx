import React, { useState, useEffect } from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import AudioPlayerPackage, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import '../../css/AudioPlayer.css'

const AudioPlayer = ({ audioURL, audioFileDownloadName }) => {
  const [isMobileScreenWidth, setIsMobileScreenWidth] = useState(false)
  let audioSrc = useBaseUrl(audioURL)

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobileScreenWidth(window.innerWidth <= 768) // Adjust this value as needed
    }

    // Check on initial render
    checkScreenWidth()

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenWidth)

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenWidth)
  }, [])

  const handleDownloadAudioFile = async () => {
    try {
      const response = await fetch(audioSrc)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      // Extract the file name from the URL or use a default name
      const fileName = audioFileDownloadName || 'audio.mp3'
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
      // You might want to show an error message to the user here
    }
  }

  const downloadButton = (
    <button key='download' onClick={handleDownloadAudioFile}>
      {isMobileScreenWidth ? 'Download' : 'Download Audio'}
    </button>
  )

  return (
    <AudioPlayerPackage
      src={audioSrc}
      customProgressBarSection={[
        RHAP_UI.CURRENT_TIME,
        RHAP_UI.PROGRESS_BAR,
        RHAP_UI.CURRENT_LEFT_TIME,
      ]}
      customAdditionalControls={[downloadButton]}
      customVolumeControls={isMobileScreenWidth ? [] : undefined}
    />
  )
}

export default AudioPlayer

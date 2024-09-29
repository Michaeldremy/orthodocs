import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export function useFirebase() {
  const { siteConfig } = useDocusaurusContext()
  const firebaseConfig = siteConfig.customFields.firebaseConfig

  if (!firebaseConfig || Object.values(firebaseConfig).some(value => !value)) {
    console.error(
      'Firebase configuration is incomplete. Check your environment variables.'
    )
    return { auth: null }
  }

  try {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    return { auth }
  } catch (error) {
    console.error('Error initializing Firebase:', error)
    return { auth: null }
  }
}

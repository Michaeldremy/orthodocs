import React, { useState, useEffect, useRef } from 'react'
import { useFirebase } from '@site/src/firebase'
import useAuthStore from '@site/src/stores/authStore'
import styles from './LoginButton.module.css'
import { IoLogOut } from 'react-icons/io5'

function LoginButton() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { auth } = useFirebase()
  const { user, isLoggedIn, signIn, signOut, setUser } = useAuthStore()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [auth, setUser])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSignIn = async () => {
    try {
      await signIn(auth)
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setDropdownOpen(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const getInitials = name => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className={styles.loginButtonContainer} ref={dropdownRef}>
      {isLoggedIn ? (
        <div className={styles.userContainer}>
          <div className={styles.userInfo} onClick={toggleDropdown}>
            <div className={styles.avatarContainer}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.initials}>
                  {getInitials(user.displayName)}
                </div>
              )}
            </div>
            <p>{user.displayName.split(' ')[0]}</p>
          </div>
          {dropdownOpen && (
            <div className={styles.dropdown}>
              <div className={styles.signOutContainer} onClick={handleSignOut}>
                <IoLogOut />
                <button className={styles.signOutButton}>Sign Out</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.signInContainer} onClick={handleSignIn}>
          <button className={styles.signInButton}>Login</button>
        </div>
      )}
    </div>
  )
}

export default LoginButton

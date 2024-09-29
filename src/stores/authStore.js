// src/stores/authStore.js
import { create } from 'zustand'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

const useAuthStore = create(set => ({
  user: null,
  isLoggedIn: false,
  error: null,
  setUser: user => set({ user, isLoggedIn: !!user }),
  signIn: async auth => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      set({ user: result.user, isLoggedIn: true, error: null })
    } catch (error) {
      set({ error: error.message })
    }
  },
  signOut: async auth => {
    try {
      await signOut(auth)
      set({ user: null, isLoggedIn: false, error: null })
    } catch (error) {
      set({ error: error.message })
    }
  },
  clearError: () => set({ error: null }),
}))

export default useAuthStore

import create from 'zustand'
import { persist } from 'zustand/middleware'

import { User } from '../types'

interface Store {
  user: {
    user: User['body'] | null
    setUser: (user: User['body']) => void
    removeUser: () => void
  }
}

const userStore = create<Store['user']>()(
  persist((set) => ({
    user: null,
    setUser: (user: User['body']) => set({ user: user }),
    removeUser: () => set({ user: null })
  }),
  {
    name: 'user-storage'
  })
)

export { userStore }
import React from 'react'
import { useSelector } from 'react-redux'

export default function useAuth() {
   const user = useSelector(state=>(state.user.userData))
  return {user}
}

import { configureStore } from '@reduxjs/toolkit'
import AllJobsSlice from './features/AllJobsSlice'
import userSlice  from './features/userSlice'
import jobSlice  from './features/jobSlice'

export const store = configureStore({
  reducer: {
    allJobs:AllJobsSlice,
    user:userSlice,
    job:jobSlice
  },
})
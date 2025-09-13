import React from 'react'
import PublicRoutes from './routes/PublicRoutes.jsx'

export default function App() {
  return (
    <>
      <React.Suspense>
        <div className="App">
          <PublicRoutes />
        </div>
      </React.Suspense>
    </>
  )
}

import React from 'react'

function Layout({children}) {
  return (
    <div className="text-zinc-950 bg-zinc-50 min-h-[100dvh]">
        {children}
    </div>
  )
}

export default Layout
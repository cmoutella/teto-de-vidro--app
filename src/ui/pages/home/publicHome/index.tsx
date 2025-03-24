'use client'

import PublicBasePage from '@/ui/template/PublicBasePage'

const PublicHomeView = () => {
  return (
    <PublicBasePage user={null}>
      <div className="w-full p-20 flex justify-center items-center">
        <div className="container flex flex-col gap-5">
          <h1>PUBLIC HOME</h1>

          {/* Aqui deverá ter uma home apresentando o produto */}
        </div>
      </div>
    </PublicBasePage>
  )
}

export default PublicHomeView

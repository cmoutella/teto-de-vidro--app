import type { ReactElement } from 'react'

interface FormSlideLayoutProps {
  title: string
  description: string
  fields: ReactElement
  submitButton: ReactElement
}

export function FormSlideLayout({
  title,
  description,
  fields,
  submitButton
}: FormSlideLayoutProps) {
  return (
    <div className="w-full h-full bg-brand-primary-600 flex justify-center items-center pt-10 pb-3">
      <div className="w-full h-full md:max-w-[800px] lg:max-w-[1000px] md:max-h-[600px] md:bg-white md:rounded-3xl flex flex-col justify-between md:justify-center items-center">
        <div className="flex flex-col md:flex-row justify-start md:justify-between items-center h-full w-full">
          <div className="md:px-4 md:py-8 md:w-1/2 text-white md:text-brand-gray-800 mb-6">
            <h1 className="text-xl lg:text-2xl flex flex-col text-center mb-6 md:mb-10 font-semibold tracking-wide text-white md:text-brand-primary-700">
              {title}
            </h1>
            <p
              className="text-sm lg:text-base text-center"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <div className="md:h-auto w-full md:w-1/2 px-3 py-4 md:px-8 md:py-8 bg-brand-primary-600 md:bg-white rounded-t-2xl text-white md:text-brand-gray-900 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-between items-center gap-6 md:gap-14 w-full max-w-[330px] md:max-w-[400px] md:h-full">
              <div className="w-full">{fields}</div>
              <div className="hidden md:flex flex-col-reverse md:flex-row gap-2 md:gap-3 w-full">
                {submitButton}
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:hidden flex-col-reverse md:flex-row gap-2 md:gap-3 w-full max-w-[330px] md:max-w-[400px] justify-self-end">
          {submitButton}
        </div>
      </div>
    </div>
  )
}

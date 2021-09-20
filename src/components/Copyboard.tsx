import React, { useRef } from 'react'

const Copyboard = () => {
  const LINK = `${window.location.href}`
  const ref = useRef<HTMLTextAreaElement>(null)

  const onClick = () => {
    if (ref.current) {
      ref.current.select()
      document.execCommand('copy')
    }
  }

  return (
        <div className="w-full px-4 py-2 mt-8 text-black bg-gray-300 rounded-sm lg:w-auto">
            <h3>Share your list with your friends!</h3>
            <div className="flex justify-between mt-2" onClick={onClick}>
                <textarea ref={ref} className="w-full h-12 p-1 text-xs font-semibold border-2 border-black resize-none lg:p-2 lg:w-96" value={LINK}>{LINK}</textarea>
                <button className="ml-2">
                    <i className="material-icons">content_copy</i>
                </button>
            </div>
        </div>
  )
}

export default Copyboard

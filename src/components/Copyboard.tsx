import React, { useRef } from 'react'
import { getListId } from '../services/storageService'

const Copyboard = () => {
  const LINK = `${process.env.REACT_APP_HOSTNAME}/${getListId()}`
  const ref = useRef<HTMLTextAreaElement>(null)

  const onClick = () => {
    if (ref.current) {
      ref.current.select()
      document.execCommand('copy')
    }
  }

  return (
        <div className="bg-gray-300 text-black px-4 py-2 rounded-sm mt-8 w-full lg:w-auto">
            <h3>Share your list with your friends!</h3>
            <div className="flex justify-between mt-2" onClick={onClick}>
                <textarea ref={ref} className="font-semibold text-xs border-2 border-black resize-none p-1 lg:p-2 w-full lg:w-96 h-12" value={LINK}>{LINK}</textarea>
                <button className="ml-2">
                    <i className="material-icons">content_copy</i>
                </button>
            </div>
        </div>
  )
}

export default Copyboard

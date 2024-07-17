import React from 'react'

const ButtonLoader = () => {
  return (
   <>
    <div className="Button-Loader-container">
      <svg className={"Button-loader-svg"} viewBox="25 25 50 50">
        <circle className={"Button-Loader-circle"} r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
   </>
  )
}

export default ButtonLoader
/* eslint-disable react/prop-types */
import "./custom-button.scss"

const CustomButton = ({ children, ...otherProps }) => {
  return (
      <button { ...otherProps}>
          { children }
    </button>
  )
}

export default CustomButton
import React from "react"
import { PropTypes } from 'prop-types';
import placeholderImage from '../assets/placeholder-restaurant.png'
const Image = React.memo(({ src, ...rest }) => {
    return (
        <img
            src={src}
            loading="lazy" {...rest}
            onError={(e) => {
                this.src =
                    e.target.src = placeholderImage
            }}
        />
    )
})
Image.prototype = {
    src: PropTypes.element.isRequired,

}
export default Image
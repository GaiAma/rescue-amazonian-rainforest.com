import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'react-emotion'

// const Form = styled.form`

// `

const PayPal = ({ lang }) => {
  if (lang === `de`) {
    return (
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
      >
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="Z89U2RNG8U5SJ" />
        <input
          type="image"
          src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif"
          border="0"
          name="submit"
          alt="Jetzt einfach, schnell und sicher online bezahlen – mit PayPal."
        />
        <img
          alt=""
          border="0"
          src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    )
  }

  if (lang === `es`) {
    return (
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
      >
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="57K8TDYNE996G" />
        <input
          type="image"
          src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif"
          border="0"
          name="submit"
          alt="PayPal, la forma rápida y segura de pagar en Internet."
        />
        <img
          alt=""
          border="0"
          src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    )
  }

  return (
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_top"
    >
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="hosted_button_id" value="P3TVVSJU7TZ2L" />
      <input
        type="image"
        src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
        border="0"
        name="submit"
        alt="PayPal - The safer, easier way to pay online!"
      />
      <img
        alt=""
        border="0"
        src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif"
        width="1"
        height="1"
      />
    </form>
  )
}

PayPal.propTypes = {
  lang: PropTypes.oneOf([`en`, `de`, `es`]),
}

PayPal.defaultProps = {
  lang: `en`,
}

export default PayPal

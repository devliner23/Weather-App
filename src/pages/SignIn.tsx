import React from 'react'
import { WeatherAuth } from '../auth/WeatherAuth'

function SignIn() {
  const weatherAuth = WeatherAuth();

  const { render } = weatherAuth;

  return (
    <div>
      {render}
    </div>
  )
}

export default SignIn

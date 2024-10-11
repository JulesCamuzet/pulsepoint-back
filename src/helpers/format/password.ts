const checkIfContainsNumber = (val: string) => {
  const regex = /[0-9]/

  return regex.test(val)
}

const checkIfContainsSpecialChar = (val: string) => {
  const regex = /a-zA-Z0-9!@#\$%\^\&*\)\(+=._-/g

  return regex.test(val)
}

export const checkPasswordFormat = (password: string) => {
  if (password.length < 8) {
    return false
  }

  if (!checkIfContainsNumber(password)) {
    return false
  }

  // if (!checkIfContainsSpecialChar(password)) {
  //   return false
  // }

  return true
}

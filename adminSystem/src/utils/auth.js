import Cookies from 'js-cookie'

const TokenKey = 'Laisi_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const InfoKey = 'Laisi_info'

export function getUInfo() {
  return localStorage.getItem(InfoKey)
}

export function setUInfo(user) {
  return localStorage.setItem(InfoKey, user)
}

export function removeUInfo() {
  return localStorage.removeItem(InfoKey)
}

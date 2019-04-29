import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const RoleKey = 'role'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRole() {
  return Cookies.get(RoleKey)
}

export function setRole(token) {
  return Cookies.set(RoleKey, token)
}

export function removeRole() {
  return Cookies.remove(RoleKey)
}


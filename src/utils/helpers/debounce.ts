//Custom debounce method
export function debounce(callback: any, delay: number) {
  let timeout:any = null
  return (...args:any[]) => {
    window.clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

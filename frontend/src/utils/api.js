// utils/api.ts
export const safeFetch = async (url, options = {}) => {
    try {
      const res = await fetch(url, options)
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message || 'Unknown error' }
    }
  }
  
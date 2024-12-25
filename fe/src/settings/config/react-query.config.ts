import { QueryClient } from 'react-query'

/**
 * REACT QUERY CLIENT
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default queryClient

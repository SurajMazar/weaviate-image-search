'use client'
import React, { PropsWithChildren } from 'react'
import { QueryClientProvider } from 'react-query'
import queryClient from '@/settings/config/react-query.config'
import { ReactQueryDevtools } from 'react-query/devtools'

const ReactQueryContainer: React.FC<PropsWithChildren> = (props) => {
  /**
   * COMPONENT PROPS
   */
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default ReactQueryContainer

import React, { PropsWithChildren, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import ReduxContainer from '@/container/hoc/ReduxContainer'
import ReactQueryContainer from '@/container/hoc/ReactQueryContainer'
import AntdThemeContainer from '@/container/hoc/AntdThemeContainer'
import NotificationWrapper from '@/container/context/NotificationContext'
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'

/**
 *
 * @param children
 * @constructor
 */
const ApplicationProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ReduxContainer>
        <AntdThemeContainer>
          <NotificationWrapper>
            <ReactQueryContainer>
              <RouterProvider
                router={createBrowserRouter([
                  {
                    path: '/',
                    element: children,
                  },
                ])}
              />
            </ReactQueryContainer>
          </NotificationWrapper>
        </AntdThemeContainer>
      </ReduxContainer>
    </>
  )
}

/**
 *
 * @param ui
 * @param options
 */
const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: ApplicationProviders, ...options })

export { renderWithProviders, render }

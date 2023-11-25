'use client'

import { usePathname } from 'next/navigation'
import React, { FC, memo } from 'react'

import Layout from '~components/Layout/Layout'

const sidebarLinks = {
  journals: '/journal',
  history: '/history',
}

// eslint-disable-next-line react/function-component-definition
const Sidebar: FC<React.PropsWithChildren<unknown>> = () => {
  const router = usePathname()
  const journalActive = router.endsWith('/journal')
  const historyActive = router.endsWith('/history')

  return (
    <Layout.Sidebar>
      <Layout.Sidebar.Header>
        <span className="text-3xl">MOOD</span>
      </Layout.Sidebar.Header>

      <Layout.Sidebar.Body>
        <Layout.Navigation>
          <Layout.Navigation.Item>
            <Layout.Navigation.Link href={sidebarLinks.journals} active={journalActive}>
              Journals
            </Layout.Navigation.Link>
          </Layout.Navigation.Item>

          <Layout.Navigation.Item>
            <Layout.Navigation.Link href={sidebarLinks.history} active={historyActive}>
              History
            </Layout.Navigation.Link>
          </Layout.Navigation.Item>
        </Layout.Navigation>
      </Layout.Sidebar.Body>
    </Layout.Sidebar>
  )
}

export default memo(Sidebar)

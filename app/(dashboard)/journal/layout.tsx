import { UserButton } from '@clerk/nextjs'

import Layout from '~components/Layout/Layout'
import Sidebar from '~components/Sidebar'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Sidebar />

      <Layout.Content>
        <Layout.Content.Header>
          <UserButton afterSignOutUrl="/" />
        </Layout.Content.Header>
        <Layout.Content.Body>{children}</Layout.Content.Body>
      </Layout.Content>
    </Layout>
  )
}

export default DashboardLayout

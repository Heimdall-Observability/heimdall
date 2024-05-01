import { Dashboard } from '@/components/dashboard'
import { generateToken } from '@/lib/generate-token'

const DemoPage = () => {
  const token = generateToken({
    website: 'heimdall',
    name: '',
    id: 'heimdall',
  })

  return (
    <Dashboard
      // website={{
      //   id: 'localhost',
      //   url: 'http://localhost:3000',
      //   title: 'localhost',
      // }}
      website={{
        id: 'heimdall',
        url: 'https://heimdall.francismasha.com',
        title: 'Heimdall',
        // plan: "plus",
        // userId: "",
        // createdAt: new Date(),
        // public: false,
        // active: true
      }}
      showSetup={false}
      token={token}
      isPublic={false}
    />
  )
}

export default DemoPage

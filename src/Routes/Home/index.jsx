import React from 'react'
import Layout from "../../Components/Layout"

const HomeRoute = () => {
    const Home = React.lazy(() => import("../../Views/Home"));

  return (
    <Layout>
        <Home/>
    </Layout>
  )
}

export default HomeRoute
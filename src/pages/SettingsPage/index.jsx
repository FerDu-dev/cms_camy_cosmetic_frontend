import { Outlet } from "react-router-dom"
import { Layout } from "antd"
export const SettingsPage = () => {

    return (
        <Layout.Content>
            <Outlet />
        </Layout.Content>
    )
}

export default SettingsPage;
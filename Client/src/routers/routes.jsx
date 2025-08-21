import { Route, Routes } from "react-router"
import App from "../App"
import Homepage from "../pages/Homepage"
import Landingpage from "../pages/Landingpage"
import MainLayout from "../layouts/mainLayout"

export default function Routers() {
    return (
        <Routes>
            <Route path="/home" element={<MainLayout><Homepage/></MainLayout>} />
            <Route path="/" element={<MainLayout><Landingpage/></MainLayout>}/>
        </Routes>
    )
}

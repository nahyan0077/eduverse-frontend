import { ContactPage } from "@/components/common/pages/ContactPage"
import Footer from "@/components/common/users/Footer"
import Header from "@/components/common/users/Header"

export const Contact: React.FC = () => {
    return (
        <>
            <Header/>
            <ContactPage />
            <Footer/>
        </>
    )
}
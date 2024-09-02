import NavbarData from "./Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";

const Header = async() =>{
    const session = await getServerSession(authOptions)
return(
 <NavbarData email={session?.user.email} name={session?.user.name}/>
)}
export default Header;
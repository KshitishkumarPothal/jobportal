import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout =() =>{
    return(
        <div>
            <div className="grid-background"></div>
            <main className="min-h-screen  container"> 
                <Header/>
                <Outlet/>
            </main>
            <div className=" p-10 text-center bg-gray-800 mt-10">
                Made By <a href="https://www.linkedin.com/in/kshitish-kumar-pothal-671848237/">Kshitish</a>
            </div>
            
        </div>
    );
};
export default AppLayout;
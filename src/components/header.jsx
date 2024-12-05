import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { BriefcaseBusiness, HeartIcon, PenBox } from "lucide-react";
import { useEffect, useState } from "react";


const Header = () => {
    const [showSignIn,setShowSignIn] = useState(false);
    const [search, setSearch] = useSearchParams();
    const {user} = useUser();

    useEffect(() =>{
        if(search.get('sign-in')){
            setShowSignIn(true);
        }
    },[search])

    const handleOverlayClick = (e) =>{
         if(e.target === e.currentTarget){
            setShowSignIn(false);
            setSearch({});
         }
    }
 
    return (
        <>
        <nav className=" py-4 flex justify-between items-center">
            <Link>
                <img src="/logo1.png" className="h-40" />
            </Link>

            <div className="flex gap-8">
                <SignedOut> 
                    <Button variant="outline" onClick={()=> setShowSignIn(true)}>Log in</Button>
                </SignedOut>
                <SignedIn>
                    {/* add a condition here */}
                    {user?.unsafeMetadata?.role ==="recuriter" &&(
                        <Link to="/post-job">
                       <Button variant="destructive"> <PenBox size={20}/> Post a Job</Button>
                    </Link>)}
                    <UserButton appearance={{
                        elements:{
                            avatarBox: "w-10 h-10"
                        }
                    }}>
                        <UserButton.MenuItems>
                            <UserButton.Link
                              label="My Jobs"
                              labelIcon={<BriefcaseBusiness size={15}/>}
                              href="/my-jobs"
                            />
                            <UserButton.Link
                              label="Saved Jobs"
                              labelIcon={<HeartIcon size={15}/>}
                              href="/saved-jobs"
                            />
                        </UserButton.MenuItems>

                    </UserButton>
                </SignedIn>
            </div>

        </nav>
        {showSignIn && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 " 
            onClick={handleOverlayClick}>
            <SignIn 
               signUpForceRedirectUrl="/onboarding"
               fallbackRedirectUrl="/onboarding"
            />
            </div>)}
        </>
    )
}
export default Header;
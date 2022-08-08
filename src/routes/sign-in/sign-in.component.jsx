import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { auth, creatUserDocumentFromAuth, signInWithGoogleRedirect, signInWithGooglePopup } from "../../utils/firebase/firebas.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.components"

const SignIn = () => {

    useEffect(() => {
        const getResponse = async () => {
            const response = await getRedirectResult(auth)
            console.log(response);

            if(response){
                const userDoc = await creatUserDocumentFromAuth(response.user)
            }

        }
        
        getResponse()
    }, []);

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDoc = await creatUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>sign in page</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
            <button onClick={signInWithGoogleRedirect}>Sign In With GoogleRedirect</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { auth, creatUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.components"
import SignInForm from "../../components/sign-in-form/sign-in-form.components";
import "./authentication.styles.scss"

const Authentication = () => {

    useEffect(() => {
        const getResponse = async () => {
            const response = await getRedirectResult(auth)
            console.log(response);

            if(response){
                await creatUserDocumentFromAuth(response.user)
            }

        }
        
        getResponse()
    }, []);

    // const logGoogleUser = async () => {
    //     const {user} = await signInWithGooglePopup();
    //     const userDoc = await creatUserDocumentFromAuth(user)
    // }

    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication
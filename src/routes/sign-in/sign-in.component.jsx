import { signInWithGooglePopup } from "../../utils/firebase/firebas.utils"
import { creatUserDocumentFromAuth } from "../../utils/firebase/firebas.utils";


const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        creatUserDocumentFromAuth(user)
    }
    return (
        <div>
            <h1>sign in page</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
    )
}

export default SignIn
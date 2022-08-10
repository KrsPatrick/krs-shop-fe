import { useState } from "react"

import "./sign-in-form.styles.scss"
import FormInput from "../form-input/form-input-component"
import Button from "../button/button.component"
import { signInWithGooglePopup, signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"

const defaultFromFields = {
    email: "",
    password: "",
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFromFields)
    const { email, password, } = formFields

    // const resetFormFilds = () => {
    //     setFormFields(defaultFromFields)
    // }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();    
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInUserWithEmailAndPassword(email, password)

        } catch (error) {
            switch(error.code) {
                case "auth/wrong-password":
                    alert("incorrect password")
                    break
                case "auth/user-not-found":
                    alert("no user associtaed with this email")
                    break
                default:
                    console.log(error);
            } 
        }
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                label="Email"
                type="email" 
                required 
                onChange={handleChange} 
                name="email" 
                value={email}
                />

                <FormInput 
                label="password"
                type="password" 
                required 
                onChange={handleChange} 
                name="password" 
                value={password}
                />
                <div className="buttons-container" >
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )

}


export default SignInForm
import { useState } from "react"

import "./sign-up-form.styles.scss"
import FormInput from "../form-input/form-input-component"
import Button from "../button/button.component"
import { createAuthUserWithEmailAndPassword, creatUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const defaultFromFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFromFields)
    const {displayName, email, password, confirmPassword} = formFields

    const resetFormFilds = () => {
        setFormFields(defaultFromFields)
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("passwords do not match")
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password) 
            
            await creatUserDocumentFromAuth(user, {displayName})

            resetFormFilds()

        } catch (error) {
            if (error.code === "auth/weak-password"){
                alert("Password should be at least 6 characters")
                return
            }
            else if (error.code === "auth/email-already-in-use") {
                alert("email already in use");
                return
            } else {
                console.log("something went wrong");
            }
        }
    }

    return(
        <div className="sign-up-container">
            <h2>Don`t have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label="Display Name"              
                type="text" 
                required 
                onChange={handleChange} 
                name="displayName"
                value={displayName}
                />

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

                <FormInput
                label="confirmPassword"
                type="password" 
                required 
                onChange={handleChange} 
                name="confirmPassword" 
                value={confirmPassword}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm
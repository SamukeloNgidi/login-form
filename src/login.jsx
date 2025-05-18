import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './login.css';

//npm install react-hook-form
//npm install zod
//npm install @hookform/resolvers

const Login = () => {
    //zod validation schema
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    });

    const { 
        register, 
        handleSubmit, 
        setError, 
        formState: {errors, isSubmitting} 
        } = useForm({
            defaultValues: {
                email: "test@gmail.com",
            }, 
            resolver: zodResolver(schema)
        }); //if default values are not needed, leave useForm() empty
    
    //normal function without async
    /*const onSubmit = (data) => {
        console.log(data);
    }*/

    //convert to async function
    const onSubmit = async (data) => {
        try{
            await new Promise((resolve) => setTimeout(resolve, 1000)); //wait 1 second while submitting
            //throw new Error();
            console.log(data);
        } catch (error) {
            /*setError("email", { //email, password, root
                type: "manual",
                message: "This email is already taken" //error from the backend
            });*/
            setError("root", {
                type: "manual",
                message: "This email is already taken" //error from the backend
            });
        }
    }

    return (
        <form className="login-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="header">
                {/*<img src="logo.png" alt="Company Logo" className="logo" />*/}
                <h1>Sam's Company</h1>
            </div>

            {/*with react hook form validation*/}
            {/*<input {...register("email", {
                required: {
                    value: true,
                    message: "Email is required"
                },
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address"
                }
            })} type="text" placeholder="email" />
            {errors.email && <div className="error">{errors.email.message}</div>}

            <input {...register("password", {
                required: {
                    value: true,
                    message: "Password is required"
                },
                minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                }   
            })} type="password" placeholder="Password" />
            {errors.password && <div className="error">{errors.password.message}</div>}*/}

            {/*with zod validation*/}
            <input {...register("email")} type="text" placeholder="email" />
            {errors.email && <div className="error">{errors.email.message}</div>}

            <input {...register("password")} type="password" placeholder="Password" />
            {errors.password && <div className="error">{errors.password.message}</div>}
            
            <button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Logging in..." : "Login"} {/*when submitting, display 'Logging in text'*/}
            </button>
            <br />
            {errors.root && <div className="error">{errors.root.message}</div>} {/*error from the backend that doe not belong to a single input*/}
        </form>
    )
}
export default Login;
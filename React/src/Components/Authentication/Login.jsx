import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './style.css';
import { useToast } from "@chakra-ui/react";


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [genaratePassword, setGenaratePassword] = useState(false)
    const navigate = useNavigate()
    const toast = useToast();



    const Loginhendeler = async () => {
        if (!password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return
        }
        toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        navigate('/dashboard')
    }
    const EmailCheckhendler = async () => {
        if (!email) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        else {
            setGenaratePassword(!genaratePassword)
        }
    };
    return (
        <>

            <div className="box">
                <h1>Chat Grid</h1>
                <div className='form'>
                    <div class="row">
                        <label for="email">Emp Code/ Email</label>
                        <input type="email" name="email" placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {
                        genaratePassword ? (
                            <div class="row">
                                <label for="password">Password</label>
                                <input type="password" name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        ) : (null)
                    }
                    {
                        genaratePassword ? (
                            <button type="submit"
                                onClick={Loginhendeler}

                            >
                                Login</button>
                        ) : (
                            <button type="submit"
                                onClick={EmailCheckhendler}
                            >
                                Chek Email
                            </button>
                        )
                    }
                </div>
            </div >

        </>
    )
}

export default Login
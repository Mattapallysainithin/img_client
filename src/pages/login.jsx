import React,{useState} from 'react'
import { userLogin } from '../actions/userApiCalls'
import Home from '../assets/home.jpeg'
import { setCookie } from '../helper/cookie'
import {useNavigate} from 'react-router-dom'

const Login = ({setLog}) => {

    const navigate = useNavigate()
    const [formData,setFormData]=useState({
        name:'',
        password:'',
        error:''
    })

    const handleFormData=(event)=>{
        setFormData({...formData,
        [event.target.name]:event.target.value})
    }

    const handleFormSubmit=()=>{
        if(formData.name===""||
            formData.password===""){
            
            setFormData({...formData,error:"All fields are required"})
            return
        }

        try{
            userLogin(formData.name,formData.password).then(res=>{
                localStorage.setItem('userId',res.payload.id)
                console.log(res)
                setCookie('access',res.access,1)
                setLog(true)
                navigate('/')
            })
        }catch(err){
            setFormData({...formData,error:err})
        }

        setFormData({
        name:'',
        error:'',
        password:''})
    }

    return (
        <div className="h-screen w-screen flex bg-gray-50	">
            <img src={Home} alt="Home" className="h-100 w-3/5 object-cover"/>
            <div className="h-100 w-2/5 flex flex-col justify-center items-center">
                <div className="w-4/5 h-3/6 shadow-xl rounded-xl bg-white px-8 pt-6 pb-8">
                <h1 className="text-center text-2xl mb-8 font-bold">Login</h1>
                {formData.error!=='' && 
                <p className="text-center text-red-700 text-md font-semibold">
                    {formData.error}
                </p>}
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
                        UserName
                    </label>
                    </div>
                    <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-email" type="text"
                    onChange={handleFormData}
                    value={formData.name}
                    name="name"
                    />
                    </div>
                </div>
                
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                        Password
                    </label>
                    </div>
                    <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password"
                    onChange={handleFormData}
                    value={formData.password}
                    name="password"
                    />
                    </div>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                    <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-4" 
                    type="button"
                    onClick={handleFormSubmit}>
                        Login
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login

'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react'
import { BackgroundBeams } from '@/components/BackgroundBeam'

interface FormValues {
    email: string
    password: string
}

interface FormErrors {
    email?: string
    password?: string
}

const useFormValidation = (
    initialState: FormValues,
    validate: (values: FormValues) => FormErrors
) => {
    const [values, setValues] = useState<FormValues>(initialState)
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const validationErrors = validate(values)
        setErrors(validationErrors)
        setIsSubmitting(Object.keys(validationErrors).length === 0)
    }

    return { values, errors, isSubmitting, handleChange, handleSubmit }
}

const validateForm = (values: FormValues): FormErrors => {
    let errors: FormErrors = {}
    if (!values.email) {
        errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid'
    }
    if (!values.password) {
        errors.password = 'Password is required'
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters'
    }
    return errors
}

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const { values, errors, isSubmitting, handleChange, handleSubmit } = useFormValidation(
        { email: '', password: '' },
        validateForm
    )
    return (
        <div className="h-screen w-full rounded-md  relative flex flex-col items-center justify-center antialiased">
            <motion.div
                className="bg-mixed-200/80 text-white p-8 rounded-lg shadow-2xl z-10 w-96"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className='w-full flex '>
                    <h2 className="text-3xl font-bold mb-6 ">Welcome,</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="email" className="sr-only">
                            Email
                        </Label>
                        <div className="relative">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                                className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                                aria-invalid={errors.email ? 'true' : 'false'}
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        <div className='h-3'>
                            {errors.email && (
                                <motion.p
                                    className="mt-1 text-red-500 text-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {errors.email}
                                </motion.p>
                            )}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="password" className="sr-only">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                                aria-invalid={errors.password ? 'true' : 'false'}
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <div className='h-3'>
                            {errors.password && (
                                <motion.p
                                    className="mt-1 text-red-500 text-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {errors.password}
                                </motion.p>
                            )}
                        </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>

                        <Button type="submit" className="w-full bg-primary-500 text-black" disabled={isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Sign in'}
                        </Button>
                    </motion.div>
                </form>
            </motion.div>
            <BackgroundBeams className='bg-mixed-100' />
            <div className='absolute top-4 right-4 '>

                <Button className='flex items-center gap-2 transition ease-in-out delay-150  hover:translate-x-1 over:bg-primary-300 duration-300 text-white bg-transparent p-0 pl-2 '>
                    <p>Continue as <span className='underline'>guest</span></p>
                    <ChevronRight height={22} width={22} />
                </Button>
            </div>
        </div>
    );
}

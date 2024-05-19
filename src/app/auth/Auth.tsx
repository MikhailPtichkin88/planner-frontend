"use client"
import { Heading } from "@/components/ui/Heading/Heading"
import { Button } from "@/components/ui/button/Button"
import { Field } from "@/components/ui/field/Field"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { authService } from "@/services/auth.service"
import { IAuthForm } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"



export const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(false)

  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: 'onChange',
  })
  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' : 'register', data),
    onSuccess: () => {
      toast.success(`You have successfully ${isLoginForm ? 'logged in' : 'registered'}`)
      reset()
      push(DASHBOARD_PAGES.HOME)
    }
  })

  const onSubmit = (data: IAuthForm) => {
    mutate(data)
  }

  return <div className="flex min-h-screen">
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 m-auto shadow bg-sidebar rounded-xl p-layout">


      <Heading title='Auth' />

      <Field
        id='email'
        label='Email:'
        type='email'
        extra="mb-4"
        placeholder='Enter email:'
        {...register('email', { required: true })} />


      <Field
        id='password'
        label='Password:'
        type='password'
        extra="mb-6"
        placeholder='Enter password:'
        {...register('password', { required: true })} />

      <div className="flex items-center gap-5 justify-center">
        <Button onClick={() => setIsLoginForm(true)}>Login</Button>
        <Button onClick={() => setIsLoginForm(false)}>Register</Button>
      </div>
    </form>
  </div>
}



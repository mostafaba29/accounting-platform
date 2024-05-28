'use client'
import {useState} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function Signup() {
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [passwordConfirm,setpasswordConfirm] = useState('');
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(null);

    try {
      const name:string = firstName+lastName
      const response = await axios.post('http://localhost:8000/api/v1/users/signup', {
        name,
        email,
        password,
        passwordConfirm
      })
      if (response.status === 200) {
        console.log('response', response.data);
        router.push('/auth/login');
      }else{
        setError(response.data.message);
        console.log(response.data);
      }

    } catch (error) {
      console.log(error);
    }
  }
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="hidden bg-muted lg:block">
            <Image
              src="/placeholder.svg"
              alt="Image"
              width="1920"
              height="1080"
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your information to create an accout
                </p>
              </div>
              <form onSubmit={handleSignup} className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex itmes-center justify-center" >
                  <div className="mr-3">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="your first name"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    required
                  />
                  </div>
                  <div className="ml-3">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="your last name"
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                    required
                  />
                  </div>
                </div>
                </div>
                <div className="grid gap-2">

                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                  </div>
                  <Input id="password" type="password" value={passwordConfirm} onChange={(e)=>setpasswordConfirm(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">
                  Signup
                </Button>
                <Button variant="outline" className="w-full">
                  Signup with Google
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                already have an account?{" "}
                <Link href="#" className="underline">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
};
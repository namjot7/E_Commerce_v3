'use client'

import { Button } from "@/components/ui/button"
import { APP_NAME } from "@/lib/constants"
import Image from "next/image"

const NotFoundPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen shadow-md ">
            <Image src='/images/logo.svg' alt={`${APP_NAME} logo`} width={50} height={50} priority />
            <div className="p-6 w-1/3 shadow-md rounded-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Not Found</h1>
                <p className="text-destructive">The page you are looking for does not exist.</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.href = '/'}>
                    Go to Home
                </Button>
            </div>
        </div>
    )
}

export default NotFoundPage
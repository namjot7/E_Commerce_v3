import React from 'react'
import ModeToggle from './mode-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { EclipseIcon, MenuIcon, ShoppingCart, UserIcon } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const Menu = () => {
    return (
        <div className="">
            {/* Desktop nav */}
            <nav className="hidden md:flex">
                <ModeToggle />
                <Button asChild variant='ghost'>
                    <Link href='/cart'>
                        <ShoppingCart /> Cart
                    </Link>
                </Button>
                <Button asChild>
                    <Link href='/sign-in'>
                        <UserIcon /> Sign In
                    </Link>
                </Button>
            </nav>

            {/* Mobile nav */}
            <nav className='md:hidden'>
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon />
                    </SheetTrigger>

                    <SheetContent className='flex flex-col items-start'>
                        <SheetTitle>Menu</SheetTitle>
                        <ModeToggle />
                        <Button asChild variant='ghost'>
                            <Link href='/cart'>
                                <ShoppingCart /> Cart
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href='/sign-in'>
                                <UserIcon /> Sign In
                            </Link>
                        </Button>
                        <SheetDescription></SheetDescription>
                    </SheetContent>
                </Sheet>

            </nav>
        </div >
    )
}

export default Menu
import React from 'react'
import ModeToggle from './mode-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { MenuIcon, ShoppingCart } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import UserButton from './user-button'

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
                <UserButton />
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
                        <UserButton />
                        <SheetDescription></SheetDescription>
                    </SheetContent>
                </Sheet>
            </nav>
        </div >
    )
}

export default Menu
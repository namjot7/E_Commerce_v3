import { auth } from "@/auth.config"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.actions";
import { UserIcon } from "lucide-react";
import Link from "next/link";

const UserButton = async () => {
    const session = await auth();

    // user is not logged in
    if (!session) {
        return (
            <Button asChild>
                <Link href='/sign-in'>
                    <UserIcon /> Sign In
                </Link>
            </Button>
        )
    }
    // user is logged in
    const firstInitial = session.user?.name?.charAt(0).toUpperCase() || "U";
    return (
        <div className="flex gap-2 items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center">
                        <Button className="relative h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center ml-2" variant={'ghost'}>
                            {firstInitial}
                        </Button>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel>
                        <div className="text-sm">
                            {session.user?.name}
                        </div>
                        <div className="text-sm font-medium text-muted-foreground">
                            {session.user?.email}
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="p-0 mb-1">
                        <form action={signOutUser} className="w-full ">
                            <Button variant={'ghost'} className=" w-full justify-start h-4 px-2 py-4">
                                Sign Out
                            </Button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu>
        </div>
    )
}

export default UserButton
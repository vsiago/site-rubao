import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

function NavbarMobile() {
    return (
        <Sheet>
            <SheetTrigger>Abrir</SheetTrigger>
            <SheetContent className="w-full bg-accent absolute">
                <SheetHeader className="mt-24"></SheetHeader>
                <SheetDescription className="mt-2">
                    <div className="w-full text-start text-lg">Início</div>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}

export default NavbarMobile;

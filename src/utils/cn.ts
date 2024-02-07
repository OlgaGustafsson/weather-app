import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { ClassValue } from "../../node_modules/clsx/clsx";

export function cn(...inputs: ClassValue[]){
    return twMerge(clsx(...inputs))
}
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(min: number, max: number) {
  return `¥${min.toLocaleString()}〜¥${max.toLocaleString()}`;
}

export function initials(name: string) {
  return name
    .split(/\s|　/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

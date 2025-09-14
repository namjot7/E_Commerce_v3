import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// convert prisma object to regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

// Format numbers with decimal values
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
  // padEnd 2 decimal places, add "0" if not 2 decimal places
}

// Format errors (SignUp Form)
// eslint-disable-next-line @typescript-eslint/no-explicit-any 
// above line of comment is to avoid type error in production
export function formatError(error: any) {
  console.log(error);

  // handle Zod error
  if (error.name === 'ZodError') {
    // extract all error messages from an object and create an array of them
    const fieldErrors = Object.keys(error.issues).map((field) => error.issues[field].message)
    return fieldErrors.join('. ');
  }
  // handle Prisma error
  else if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002') {
    const field = error.meta?.target ? error.meta?.target[0] : 'Field';
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
  }
  else {
    return typeof error.message === 'string' ? error.message : JSON.stringify(error.message);
  }
}

// Round number to 2 decimal places
export function round2(value: number | string) {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100; // to avoid rounding errors
  }
  else if (typeof value === 'string') {
    return Math.round((Number(value + Number.EPSILON)) * 100) / 100;
  }
  else {
    throw new Error('Value is not a number or string')
  }
}




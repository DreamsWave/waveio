import type { VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/libs/utils';

const buttonVariants = cva(
  'border-effect font-accent inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'raised-bordered bg-background text-primary-foreground hover:brightness-97',
        destructive:
          'raised-bordered bg-destructive text-destructive-foreground hover:brightness-97',
        outline:
          'bordered bg-transparent hover:bg-accent hover:text-accent-foreground',
        ghost: 'ghost disabled:text-shadow-[1px_1px_var(--primary-foreground)]',
        link: 'text-primary underline-offset-4 cursor-pointer hover:underline',
        sunken:
          'sunken-bordered bg-background text-primary-foreground hover:brightness-97',
      },
      size: {
        default: 'h-12 px-4',
        sm: 'h-10 rounded-md px-3 text-xs',
        lg: 'h-14 rounded-md px-8',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = {
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

const Button = ({ ref, className, variant, size, asChild = false, ...props }: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
};
Button.displayName = 'Button';

export { Button, buttonVariants };

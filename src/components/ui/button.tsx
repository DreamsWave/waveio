import type { VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/libs/utils';

const buttonVariants = cva(
  'font-accent inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'raised bordered bg-raised-background text-primary hover:bg-raised-background/85 active:pt-1 active:bg-raised-background',
        destructive:
          'raised bordered bg-destructive text-destructive-foreground hover:bg-destructive/70 active:bg-destructive active:pt-1',
        outline:
          'bordered bg-transparent cursor-pointer active:pt-1',
        ghost: 'ghost rounded hover:raised active:sunken active:pt-1 disabled:text-shadow-[1px_1px_var(--primary-foreground)]',
        link: 'text-primary underline-offset-4 cursor-pointer hover:underline',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10',
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
  active?: boolean;
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

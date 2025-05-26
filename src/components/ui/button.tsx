import type { VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/libs/utils';

const buttonVariants = cva(
  'font-accent transition-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'raised bordered bg-raised-background text-primary hover:bg-raised-background/85 active:pt-1 active:bg-raised-background',
        destructive:
          'raised bordered bg-destructive text-destructive-foreground hover:bg-destructive/70 active:pt-1 active:bg-destructive',
        outline:
          'bordered bg-transparent cursor-pointer active:pt-1',
        ghost:
          'raised rounded before:opacity-0 hover:before:opacity-100 hover:raised active:sunken active:pt-1',
        link:
          'text-primary underline-offset-4 cursor-pointer hover:underline',
        rounded:
          'raised rounded text-primary bg-raised-background hover:bg-raised-background/85 active:bg-raised-background active:pt-1',
      },
      size: {
        default: 'h-11 px-4',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-12 px-8 text-md',
        icon: 'h-10 w-10',
      },
      active: {
        true: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        active: true,
        class: 'sunken bg-raised-background active:pt-0',
      },
      {
        variant: 'destructive',
        active: true,
        class: 'sunken bg-destructive active:pt-0',
      },
      {
        variant: 'outline',
        active: true,
        class: ' active:pt-0',
      },
      {
        variant: 'ghost',
        active: true,
        class: 'sunken before:opacity-100 hover:sunken active:pt-0',
      },
      {
        variant: 'rounded',
        active: true,
        class: 'sunken active:pt-0',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = {
  asChild?: boolean;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
VariantProps<typeof buttonVariants>;

const Button = ({
  ref,
  className,
  variant,
  size,
  active,
  asChild = false,
  ...props
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, active, className }))}
      ref={ref}
      aria-pressed={active}
      {...props}
    />
  );
};
Button.displayName = 'Button';

export { Button, buttonVariants };

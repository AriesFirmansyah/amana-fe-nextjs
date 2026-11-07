import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded border font-bold focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed transition ease-out duration-200",
  {
    variants: {
      variant: {
        ghost:
          "text-neutral-default hover:!text-neutral-text bg-neutral-text hover:!bg-primary-500 border-0 focus-visible:ring-primary-100 focus-visible:border-0 focus-visible:bg-neutral-bg disabled:text-neutral-tertiary disabled:border-0 disabled:hover:!bg-neutral-text disabled:hover:!text-neutral-tertiary disabled:hover:!border-0",
        default:
          "text-neutral-text bg-primary-500 hover:bg-primary-600 border-primary-500 focus-visible:ring-primary-100 focus-visible:bg-primary-600 disabled:bg-neutral-tertiary disabled:border-neutral-tertiary",
        outline:
          "text-neutral-default hover:!text-neutral-text bg-neutral-text hover:!bg-primary-500 border-primary-500 focus-visible:ring-primary-100 focus-visible:border-primary-500 focus-visible:bg-neutral-bg disabled:text-neutral-tertiary disabled:border-neutral-tertiary disabled:hover:!bg-neutral-text disabled:hover:!text-neutral-tertiary disabled:hover:!border-neutral-tertiary",
      },
      size: {
        default: "text-xs py-1.5 px-4 gap-2",
        lg: "text-sm py-3 px-4 gap-3",
        xl: "text-sm py-4 px-6 gap-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

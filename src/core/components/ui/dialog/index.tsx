import { type HTMLAttributes, forwardRef, Fragment } from "react";
import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";

import type {
  DialogComponent,
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "./types";
import { cn } from "@/core/libraries/tailwind";

const DialogClose: DialogCloseProps = forwardRef(({ ...props }, ref) => {
  return (
    <Close
      {...props}
      ref={ref}
    />
  );
});
DialogClose.displayName = Close.displayName;

const DialogContent: DialogContentProps = forwardRef(
  (
    { annotations, className, children, icon, scrollable, maxWidth, ...props },
    ref,
  ) => {
    const contentNode = (
      <Content
        {...props}
        ref={ref}
        className={cn(
          !scrollable &&
            "fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "outline-none focus:outline-none duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          !scrollable &&
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        )}
      >
        <div
          className={cn(
            `w-full flex items-start gap-6 p-6 bg-white rounded-lg shadow-xl`,
            maxWidth ?? "max-w-xl",
            className,
          )}
        >
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div className="flex-1 flex flex-col gap-6">{children}</div>
        </div>
      </Content>
    );

    return (
      <DialogPortal>
        {scrollable ? (
          <Fragment>
            <DialogOverlay className="grid place-items-center overflow-y-auto">
              {contentNode}
            </DialogOverlay>
            {annotations}
          </Fragment>
        ) : (
          <Fragment>
            <DialogOverlay />
            {contentNode}
          </Fragment>
        )}
      </DialogPortal>
    );
  },
);
DialogContent.displayName = Content.displayName;

const DialogDescription: DialogDescriptionProps = forwardRef(
  ({ className, ...props }, ref) => (
    <Description
      {...props}
      ref={ref}
      className={cn("text-xs text-neutral-tertiary", className)}
    />
  ),
);
DialogDescription.displayName = Description.displayName;

const DialogFooter: DialogFooterProps = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cn("flex items-center justify-end gap-3", className)}
  />
);

const DialogHeader: DialogHeaderProps = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cn("flex flex-col gap-1", className)}
  />
);

const DialogOverlay: DialogOverlayProps = forwardRef(
  ({ className, ...props }, ref) => (
    <Overlay
      {...props}
      ref={ref}
      className={cn(
        "fixed z-50 inset-0 bg-black/25 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
    />
  ),
);
DialogOverlay.displayName = Overlay.displayName;

const DialogPortal: DialogPortalProps = forwardRef(({ ...props }, _ref) => {
  return <Portal {...props} />;
});
DialogPortal.displayName = Portal.displayName;

const DialogTitle: DialogTitleProps = forwardRef(
  ({ className, ...props }, ref) => (
    <Title
      {...props}
      ref={ref}
      className={cn("text-neutral-default text-md font-bold", className)}
    />
  ),
);
DialogTitle.displayName = Title.displayName;

const DialogTrigger: DialogTriggerProps = forwardRef(({ ...props }, ref) => {
  return (
    <Trigger
      {...props}
      ref={ref}
    />
  );
});
DialogTrigger.displayName = Trigger.displayName;

export const Dialog = forwardRef(({ ...props }, _ref) => {
  return <Root {...props} />;
}) as DialogComponent;

Dialog.Close = DialogClose;
Dialog.Content = DialogContent;
Dialog.Description = DialogDescription;
Dialog.Footer = DialogFooter;
Dialog.Header = DialogHeader;
Dialog.Title = DialogTitle;
Dialog.Trigger = DialogTrigger;

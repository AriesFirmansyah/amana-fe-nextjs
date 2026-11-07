import React, { ReactNode, useState } from "react";

import { Dialog } from "@/core/components/ui/dialog";
import { AddUserForm } from "./UserForm";
import { XCircleIcon } from "lucide-react";

export const UserDialog = (props: {
  mode: "create" | "read" | "update";
  trigger: ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const onDestroy = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Trigger asChild>{props.trigger}</Dialog.Trigger>
      <Dialog.Content
        className="gap-4"
        maxWidth="!w-[560px]"
      >
        <Dialog.Header className="relative">
          <Dialog.Title>
            <span className="capitalize">{props.mode}</span> User
          </Dialog.Title>
          <Dialog.Close className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <XCircleIcon className="text-neutral-tertiary" />
          </Dialog.Close>
        </Dialog.Header>
        <AddUserForm onDestroy={onDestroy} />
      </Dialog.Content>
    </Dialog>
  );
};

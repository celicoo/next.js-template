"use client";

import { type JSX, type ReactNode, createContext, use, useState } from "react";

import { Toast as ToastPrimitive } from "radix-ui";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
} from "~/components/toast";

type ToastProps = {
  title: ReactNode;
  description: ReactNode;
  open: boolean;
};

type ToastContextType = {
  open: (props: Omit<ToastProps, "open">) => void;
  close: () => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast(): ToastContextType {
  const toast = use(ToastContext);
  if (toast === null) {
    throw new globalThis.Error("useToast must be used within <ToastProvider>");
  }
  return toast;
}

export function ToastProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [toast, setToast] = useState<ToastProps | null>(null);

  function open(props: Omit<ToastProps, "open">): void {
    setToast({
      ...props,
      open: true,
    });
  }

  function close(): void {
    if (toast !== null) {
      setToast({
        ...toast,
        open: false,
      });
    }
  }

  function handleOpenChange(open: boolean): void {
    !open && close();
  }

  return (
    <ToastContext
      value={{
        open,
        close,
      }}
    >
      {children}
      {toast !== null && (
        <ToastPrimitive.Provider duration={10000} swipeDirection={"up"}>
          <Toast open={toast.open} onOpenChange={handleOpenChange}>
            <ToastTitle>{toast.title}</ToastTitle>
            <ToastDescription>{toast.description}</ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastPrimitive.Provider>
      )}
    </ToastContext>
  );
}

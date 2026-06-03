import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
      defaultVariants: {
        variant: "default",
      },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

// Auto-dismissing Alert Component with Progress Bar
interface AlertAutoCloseProps {
  title?: string;
  message: string;
  variant?: "default" | "destructive";
  icon?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  autoDismissTime?: number; // in milliseconds, default 3000
}

function AlertAutoClose({
  title,
  message,
  variant = "default",
  icon,
  isOpen,
  onClose,
  autoDismissTime = 3200,
}: AlertAutoCloseProps) {
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    if (!isOpen) return;

    // Scroll to top smoothly on mobile/small screens
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setProgress(100);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          onClose();
          return 100;
        }
        return prev - 100 / (autoDismissTime / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, autoDismissTime, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mb-6 max-w-md z-50 md:max-w-none">
      <Alert variant={variant}>
        {icon}
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{message}</AlertDescription>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
      <Progress value={progress} className="mt-2 h-1" />
    </div>
  );
}

export { Alert, AlertTitle, AlertDescription, AlertAutoClose }

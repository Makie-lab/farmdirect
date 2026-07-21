import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
}

export function Card({ children, className, padding = "md", hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-100 shadow-sm",
        { "p-4": padding === "sm", "p-6": padding === "md", "p-8": padding === "lg" },
        hover && "hover:shadow-md hover:border-gray-200 transition-all",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-semibold text-gray-900", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-gray-500 mt-1", className)}>{children}</p>;
}

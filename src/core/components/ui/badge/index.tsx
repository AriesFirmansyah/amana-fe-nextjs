import { cn } from "@/core/libraries/tailwind";

export const Badge = ({
  label,
  activeBadge,
  onClick,
  className,
}: BadgeProps) => {
  return (
    <div
      className={cn(
        "border cursor-pointer px-3 py-1 text-xxs min-w-fit w-fit rounded font-medium select-none",
        activeBadge ? "border-black bg-black/50 text-white" : "border-gray-500",
        className,
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

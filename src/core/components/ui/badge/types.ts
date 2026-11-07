type BadgeProps = {
  label: string;
  activeBadge?: boolean;
  onClick?(val: any): void;
  className?: string;
};

import { cn } from "@/lib/utils";

const Divider: React.FC<{
  className?: string;
}> = ({ className }) => {
  return <div className={cn("h-[2px] w-full bg-border my-4", className)}></div>;
};

export default Divider;

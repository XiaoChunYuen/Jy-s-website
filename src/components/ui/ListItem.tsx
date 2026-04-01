import { CheckCircle2 } from "lucide-react";

interface ListItemProps {
  children: React.ReactNode;
}

export function ListItem({ children }: ListItemProps) {
  return (
    <li className="flex items-start space-x-4">
      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
      <span className="text-[15px] text-stone-600 leading-[1.6]">{children}</span>
    </li>
  );
}

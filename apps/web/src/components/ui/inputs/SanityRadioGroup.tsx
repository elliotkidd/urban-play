import { RadioGroupItem } from "@workspace/packages/ui/src/components/radio-group";

import { RadioGroupProps } from "@/lib/sanity/queries/form";
import { cn } from "@/lib/utils";
import { Label } from "@workspace/packages/ui/src/components/label";
import { RadioGroup } from "@workspace/packages/ui/src/components/radio-group";

const RADIO_GROUP_CLASSES = [
  "border-theme-blue",
  "border-theme-green",
  "border-theme-yellow",
  "border-theme-red",
];

const RADIO_CIRCLE_CLASSES = [
  "fill-theme-blue",
  "fill-theme-green",
  "fill-theme-yellow",
  "fill-theme-red",
];

export default function SanityRadioGroup({
  options,
  name,
  label,
  orientation,
  className,
}: RadioGroupProps & { className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <RadioGroup
        name={name}
        orientation={orientation}
        className={cn(orientation === "horizontal" && "flex flex-row gap-2")}
      >
        {options.map((option, index: number) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className={cn(
                RADIO_GROUP_CLASSES[index % RADIO_GROUP_CLASSES.length],
              )}
              circleClassName={cn(
                RADIO_CIRCLE_CLASSES[index % RADIO_CIRCLE_CLASSES.length],
                "text-transparent",
              )}
            />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

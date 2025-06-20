import { getSkillIcon } from "@/lib/skill-icons";

interface SkillsDisplayProps {
  skills: string[];
  title: string;
}

export function SkillsDisplay({ skills, title }: SkillsDisplayProps) {
  return (
    <div className="mb-4">
      <h4 className="font-medium mb-3 text-base">{title}</h4>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, index) => {
          const IconComponent = getSkillIcon(skill);
          return (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
            >
              <IconComponent className="h-4 w-4 text-muted-foreground" />
              <span>{skill}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
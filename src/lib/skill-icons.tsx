import {
  Code,
  Database,
  Globe,
  Server,
  GitBranch,
  Cloud,
  Palette,
  Terminal,
  Settings,
  Shield,
  Key,
  Users,
  Zap,
  Network,
  Layers,
} from "lucide-react";

export const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  // Frontend
  "React": Code,
  "Next.js": Globe,
  "TypeScript": Code,
  "Tailwind CSS": Palette,
  "HTML5": Globe,
  "CSS3": Palette,
  "JavaScript": Code,
  
  // Backend
  "Node.js": Server,
  "Express.js": Server,
  "Python": Code,
  "REST APIs": Server,
  "GraphQL": Database,
  "Java": Code,
  "C#": Code,
  
  // Database
  "MongoDB": Database,
  "PostgreSQL": Database,
  "MySQL": Database,
  "Firebase": Database,
  "Redis": Database,
  
  // Authentication & Security
  "OAuth 2.0": Key,
  "Session Management": Shield,
  "JWT": Key,
  "Bitkub-Auth": Shield,
  "Authentication Systems": Shield,
  "ACL Management": Shield,
  "Role-Based Access": Users,
  "Internal Tools": Settings,
  "Security": Shield,
  
  // Tools
  "Git": GitBranch,
  "Docker": Settings,
  "AWS": Cloud,
  "Vercel": Cloud,
  "Figma": Palette,
  "VS Code": Terminal,
  "Kubernetes": Settings,
  "Jenkins": Settings,
  
  // Specializations
  "Design Systems": Palette,
  "Design Tokens": Palette,
  "User Onboarding": Users,
  "Fintech Solutions": Zap,
  "Team Leadership": Users,
  "User Experience": Users,
  "Documentation": Code,
  "Microservices": Network,
  "Domain-Driven Design": Layers,
  "Micro Frontend": Globe,
};

export function getSkillIcon(skillName: string) {
  const IconComponent = skillIcons[skillName] || Code;
  return IconComponent;
}

export function renderSkillWithIcon(skillName: string, className?: string) {
  const IconComponent = getSkillIcon(skillName);
  return (
    <span className="inline-flex items-center gap-1">
      <IconComponent className={className || "h-4 w-4"} />
      {skillName}
    </span>
  );
}
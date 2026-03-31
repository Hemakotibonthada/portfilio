import * as LucideIcons from 'lucide-react';

export default function DynamicIcon({ name, ...props }) {
  const Icon = LucideIcons[name];
  if (!Icon) return <LucideIcons.Code2 {...props} />;
  return <Icon {...props} />;
}

import { connection } from 'next/server';
import { SkillsCatalogue } from '@/components/skills-catalogue';

export default async function Page() {
  await connection();
  return <SkillsCatalogue />;
}

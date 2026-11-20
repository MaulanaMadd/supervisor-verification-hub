import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MOCK_SUPERVISORS } from '@/data/mockSupervisors';
import SupervisorDetailView from '@/components/SupervisorDetailView';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MOCK_SUPERVISORS.map((supervisor) => ({
    id: supervisor.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const supervisor = MOCK_SUPERVISORS.find((s) => s.id === id);

  if (!supervisor) {
    return {
      title: 'Supervisor Not Found | SVH',
    };
  }

  return {
    title: `${supervisor.name} - Verification Profile | SVH`,
    description: `Audit verification profile, research scope, information sources, and recommended next actions for ${supervisor.name}.`,
  };
}

export default async function SupervisorDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supervisor = MOCK_SUPERVISORS.find((s) => s.id === id);

  if (!supervisor) {
    notFound();
  }

  return <SupervisorDetailView supervisor={supervisor} />;
}

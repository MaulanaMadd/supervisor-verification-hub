import { Suspense } from 'react';
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

async function SupervisorDetailLoader({ params }: PageProps) {
  const { id } = await params;
  const supervisor = MOCK_SUPERVISORS.find((s) => s.id === id);

  if (!supervisor) {
    notFound();
  }

  return <SupervisorDetailView supervisor={supervisor} />;
}

export default function SupervisorDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-slate-500 text-sm">
          Loading Supervisor Profile...
        </div>
      }
    >
      <SupervisorDetailLoader params={params} />
    </Suspense>
  );
}

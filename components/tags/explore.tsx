import { AppLink } from '@/components/nodes/app-link';

export const Explore = () => {
  return (
    <div className="mb-10 grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ExploreCard
        title="Getting Started"
        description="Learn how to install IceRPC and write your first IceRPC application."
        href="/getting-started"
      />
    </div>
  );
};

type ExploreCardProps = {
  title: string;
  description: string;
  href: string;
};

const ExploreCard = ({ title, description, href }: ExploreCardProps) => (
  <AppLink
    href={href}
    className="flex flex-col justify-between rounded-xl border bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkAccent"
    showArrow={false}
  >
    <div className="flex flex-col justify-between">
      <h3 className="my-0 text-[16px] font-semibold">{title}</h3>
      <p className="my-0 mt-1 text-[13px] text-[var(--text-color-secondary)] dark:text-white/80">
        {description}
      </p>
    </div>
  </AppLink>
);

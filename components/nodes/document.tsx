import { ReactElement } from 'react';
import { AsideItem, Divider, Title } from 'components';
import { PageHistory,Aside, Feedback } from '@/components/shell';

type Props = {
  children: ReactElement[] | ReactElement;
  title: string;
  description: string;
  path: string;
  headings: any[];
  readingTime?: string;
  showAside?: boolean;
  showNavigation?: boolean;
};

export const Document = ({
  children,
  title,
  description,
  path,
  readingTime,
  headings,
  showNavigation = true
}: Props) => {
  return (
    <div className="flex shrink flex-row justify-center overflow-y-clip lg:justify-start">
      <article className="mx-6 mt-10 size-full max-w-[full] md:mx-10 lg:mx-16">
        {true && (
          <Title
            title={title}
            description={description}
            path={path}
            readingTime={readingTime}
          />
        )}
        {
          <div
            style={{
              counterReset: 'step-counter'
            }}
          >
            <>{children}</>
          </div>
        }
        {showNavigation && <PageHistory path={path} />}
        <Divider id="feedback-divider" margin="my-0" />
        <Feedback />
      </article>
      {true && (
        <Aside
          asideItems={headings.filter(Boolean) as AsideItem[]}
          path={path}
        />
      )}
    </div>
  );
};


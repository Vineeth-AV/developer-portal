import React, { ReactNode } from 'react';
import clsx from 'clsx';

import { Divider } from '@/components/divider';
import { HeadingCopyButton } from './heading-copy-button';

type Props = {
  id?: string;
  level: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
  showDividers?: boolean;
};

export const Heading = ({
  id = '',
  level = 1,
  children,
  showDividers = true
}: Props) => {
  const Component: any = `h${level}`;
  return (
    <Component
      id={id}
      data-text={children}
      role="presentation"
      className={clsx(
        'mb-2 mt-6 items-center  hover:[&>*]:opacity-100',
        level !== 1 && 'group scroll-mt-28'
      )}
    >
      <div className="flex items-center justify-start">
        <span role="heading" aria-level={level}>
          {children}
        </span>
        <HeadingCopyButton id={id} />
      </div>
      {level >= 1 && level <= 3 && showDividers && <Divider margin="my-0" />}
    </Component>
  );
};

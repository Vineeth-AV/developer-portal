import { clsx } from 'clsx';

type Props = {
  margin?: string;
  id?: string;
};
export const Divider = ({ margin, id }: Props) => {
  return (
    <div
      id={id}
      className={clsx(
        'h-px bg-lightBorder dark:bg-darkBorder',
        margin ? margin : 'my-8'
      )}
    />
  );
};

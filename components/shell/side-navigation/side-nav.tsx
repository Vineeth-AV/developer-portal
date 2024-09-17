import { sideBarData, baseUrls } from 'data';
import { SideNavList } from './side-nav-list';

export const SideNav = ({ path }: { path: string }) => {
  // Clean up path
  const pathNoFragment = path.split('#')[0]; // Remove fragment
  const pathSegments = pathNoFragment.split('/'); // Split into segments
  const baseUrl = baseUrls.find((item) => item === `/${pathSegments[1]}`) ?? ''; // Get base url

  // Construct the sidebar cells
  const data = sideBarData(baseUrl);
  const cells = data.map((item, index) => (
    <SideNavList key={index} data={item} path={path} />
  ));

  return (
    <div className="sticky top-[6.4rem] hidden lg:flex h-screen flex-col items-end border-r border-lightBorder pb-[6.4rem] pt-4 dark:border-darkBorder/60 bg-[#FFFFFF] dark:bg-dark">
      <div className="flex size-full min-w-[300px] max-w-[300px] flex-col justify-start   pl-1">
        <div className="sticky top-0 space-y-5 bg-white pr-6 dark:bg-dark">
          <div className="pointer-events-none absolute inset-x-0 -bottom-9 h-9 w-full bg-gradient-to-t from-transparent to-white dark:to-dark" />
        </div>
        <nav>
          <ul className="top-0 mb-2 mr-2 mt-4">{cells}</ul>
          <div className="pointer-events-none sticky inset-x-0 bottom-0 h-10 w-full bg-gradient-to-t from-white to-transparent dark:from-dark" />
        </nav>
      </div>
    </div>
  );
};

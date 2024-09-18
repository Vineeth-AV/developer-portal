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
    <div className="fixed top-[7.1rem] left-0 h-screen w-[280px] flex flex-col border-r border-lightBorder dark:border-darkBorder/60 bg-[#FFFFFF] dark:bg-dark z-50">
    {/* Scrollable content area */}
    <div className="flex-grow overflow-y-scroll scrollbar-hide pb-24">
      <div className="min-w-[280px] max-w-[280px] pl-1">
        <div className="sticky top-0 space-y-5 bg-white pr-6 dark:bg-dark">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-9 w-full bg-gradient-to-t from-transparent to-white dark:to-dark" />
        </div>
        
        <nav>
          <ul className="top-2 mb-2 mr-2 mt-2 first:mt-2 first:pt-0">
            {cells}
          </ul>
          <div className="pointer-events-none sticky inset-x-0 bottom-0 h-10 w-full bg-gradient-to-t from-white to-transparent dark:from-dark" />
        </nav>
      </div>
    </div>
  </div>
  );
};

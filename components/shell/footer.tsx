import Link from 'next/link';

const linkAttributes = {
  className: 'text-gray-500 hover:underline dark:text-[rgba(255,255,255,0.6)]'
};

const footerMenuItems = [
  {
    href: '',
    text: 'About'
  },
  {
    href: '',
    text: 'Privacy Policy'
  },
  {
    href: '',
    text: 'Contact'
  }
];

export const Footer = () => (
  <footer className="-mb-2 mt-auto border-t border-lightBorder items-center py-3 h-14 bg-[#F8FBFD]  dark:border-darkBorder dark:bg-dark">
    <div className="mx-auto  max-w-[full] px-4">
      <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between  md:px-10">
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center underline">
          © {new Date().getFullYear()} Verteil India Pvt Ltd
        </span>
        <ul className="mt-3 flex flex-wrap items-center space-x-6 text-sm font-medium sm:mt-0">
          {footerMenuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} {...linkAttributes}>
                <span className="underline">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);
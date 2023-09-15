import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  crumbs?: Crumb[];
};

const Breadcrumbs = ({ crumbs = [] }: Props) => (
  <div className="breadcrumbs mb-4 text-sm">
    <ul>
      <li>
        <Link href="/">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5 22C3.34315 22 2 20.6568 2 19V11.3361C2 10.4856 2.36096 9.67512 2.99311 9.10619L9.9931 2.80619C11.134 1.77937 12.866 1.77937 14.0069 2.80619L21.0069 9.10619C21.639 9.67512 22 10.4856 22 11.3361V19C22 20.6568 20.6569 22 19 22H5ZM20 11.3361V19C20 19.5523 19.5523 20 19 20H16V15C16 13.3431 14.6569 12 13 12H11C9.34315 12 8 13.3431 8 15V20H5C4.44772 20 4 19.5523 4 19V11.3361C4 11.0526 4.12032 10.7824 4.33104 10.5928L11.331 4.29278C11.7113 3.9505 12.2887 3.9505 12.669 4.29278L19.669 10.5928C19.8797 10.7824 20 11.0526 20 11.3361ZM10 20V15C10 14.4477 10.4477 14 11 14H13C13.5523 14 14 14.4477 14 15V20H10Z"
              fill="#6F767E"
            />
          </svg>
        </Link>
      </li>
      {crumbs.map(({ label, href }) => (
        <li key={label}>
          {href ? <Link href={href}>{label}</Link> : <span>{label}</span>}
        </li>
      ))}
    </ul>
  </div>
);

export default Breadcrumbs;

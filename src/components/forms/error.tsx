type Props = {
  message?: string;
};
const Error = ({ message }: Props) =>
  message ? (
    <span className=" py-1 text-sm text-red-500">{message}</span>
  ) : null;
export default Error;

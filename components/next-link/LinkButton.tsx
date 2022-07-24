import { Button, ButtonProps } from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link';

type Props = ButtonProps & LinkProps;

const LinkButton = ({ href, children, ...props }: Props) => {
  return (
    <Link href={href} passHref>
      <Button as='a' {...props}>
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;

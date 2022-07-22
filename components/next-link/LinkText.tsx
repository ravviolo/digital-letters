import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { LinkProps, Link } from '@chakra-ui/react';

type Props = NextLinkProps & LinkProps;

const LinkText = ({ href, children, ...props }: Props) => {
  return (
    <NextLink href={href} passHref>
      <Link as='a' {...props}>
        {children}
      </Link>
    </NextLink>
  );
};

export default LinkText;

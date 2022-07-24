import { Flex, FlexProps, Icon, useColorModeValue } from "@chakra-ui/react";

type IconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
  size?: string | number;
};

type Props = FlexProps & {
  icon?: React.FC<IconProps>;
  children: React.ReactNode;
  color?: string;
  highlightColor?: string;
};


const NavItem = ({
  icon,
  color,
  highlightColor,
  children,
  ...flexProps
}: Props) => {
  return (
    <Flex
      align='center'
      px='4'
      pl='4'
      py='3'
      cursor='pointer'
      color={useColorModeValue('inherit', 'gray.400')}
      _hover={{
        bg: useColorModeValue('gray.100', 'gray.900'),
        color: useColorModeValue('gray.900', 'gray.200'),
      }}
      role='group'
      fontWeight='semibold'
      transition='.3s ease'
      {...flexProps}
    >
      {icon && (
        <Icon
          mx='2'
          boxSize='4'
          color={color}
          _groupHover={{
            color: highlightColor,
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

export default NavItem

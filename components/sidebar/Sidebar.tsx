import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react";

import SidebarContent from "./SidebarContent";

type Props = {
    sidebar: {
        isOpen: boolean,
        onClose: () => void,
    }
}

const Sidebar = ({sidebar}: Props) => {
  return (
    <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement='left'>
      <DrawerOverlay />
      <DrawerContent>
        <SidebarContent closeSidebar={sidebar.onClose} />
      </DrawerContent>
    </Drawer>
  );
}

export default Sidebar

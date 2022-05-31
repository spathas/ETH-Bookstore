import { useRouter } from 'next/router';
import { useAccount } from '@components/hooks/web3';

//MUI COMPONENTS
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//STYLES
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

//NAV DATA
const navData = [
  {
    name: 'Marketplace',
    path: '/',
    icon: <FindInPageRoundedIcon color='primary' />,
  },
  {
    name: 'My books',
    path: '/owned',
    icon: <AddBoxRoundedIcon color='primary' />,
  },
  {
    name: 'Admin Panel',
    path: '/admin',
    icon: <AdminPanelSettingsIcon color='primary' />,
  },
];

function MenuBar({ triggerMenu, closeBar }) {
  const router = useRouter();
  const { account } = useAccount();

  const handleClose = () => {
    closeBar();
  };

  return (
    <Drawer anchor={'left'} open={triggerMenu} onClose={handleClose}>
      <List>
        {navData.map((item, index) => {
          if (!account.isAdmin && item.path === '/admin') return;
          return (
            <ListItem
              button
              key={item.name}
              onClick={() => {
                handleClose();
                router.push(item.path);
              }}
              sx={{ mr: 4 }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default MenuBar;

import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { SortByAlpha, SortByAlphaReverse, AccessTime, AccessTimeReverse } from '@mui/icons-material';

const Sidebar = () => {
  return (
    <div>
      <List>
        <ListItem button>
          <ListItemIcon>
            <SortByAlpha />
          </ListItemIcon>
          <ListItemText primary="Sort A-Z" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SortByAlphaReverse />
          </ListItemIcon>
          <ListItemText primary="Sort Z-A" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <AccessTime />
          </ListItemIcon>
          <ListItemText primary="Most Recent" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AccessTimeReverse />
          </ListItemIcon>
          <ListItemText primary="Least Recent" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
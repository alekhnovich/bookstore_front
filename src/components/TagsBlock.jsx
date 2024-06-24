// TagsBlock.js
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Теги">
      <List>
        {isLoading ? (
          <Skeleton variant="rectangular" width={100} height={24} />
        ) : (
          items.map((name, i) => (
            <a
              key={i}
              style={{ textDecoration: "none", color: "black" }}
              href={`/tags/${name}`}
            >
              <ListItem key={i} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TagIcon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            </a>
          ))
        )}
      </List>
    </SideBlock>
  );
};

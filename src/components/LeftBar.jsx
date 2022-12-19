import * as React from "react";
import axios from "axios";
import baseUrl from "../config";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
export default function LeftBar({forRefresh,setSelectDish,selectDish}) {
  const [data, setData] = React.useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const fetchData = async () => {
    let { data } = await axios.post(`${baseUrl}/listDish`, {
      pageNum,
    });
    setData(data.result);
    setTotalPage(data.totalPage);
  };
  React.useEffect(() => {
    fetchData();
  }, [pageNum,forRefresh]);
  const searchDish = async (val) => {
    try {
      let { data } = await axios.post(`${baseUrl}/search`, {
        name: val,
      });
      setData(data.result);
      setTotalPage(1);
    } catch (error) {
      fetchData();
    }
  };
  
  return (
    <>
      <div className="searchBox">
        <SearchIcon />
        <input type="search" onChange={(e) => searchDish(e.target.value)} />
      </div>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 520,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        <li>
          <ul className="listParent">
            <h3>List Of Dishes</h3>
            {data?.map((item, i) => (
              <ListItem className={selectDish?.active===i ?"listItemActive":"listItem"} key={i} onClick={()=>{setSelectDish({id:item._id,name:item.name,ingredients:item.ingredients,create:true,update:true,active:i})}}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </ul>
        </li>
      </List>
      <br />
      <Stack spacing={2} className="bottomAlways">
        <Pagination
          count={totalPage}
          page={pageNum}
          onChange={(e, page) => {
            setPageNum(page);
          }}
          color="primary"
        />
      </Stack>
    </>
  );
}

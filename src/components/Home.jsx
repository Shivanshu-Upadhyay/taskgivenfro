import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import RightBar from "./RightBar";
import LeftBar from "./LeftBar";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function Home() {
  const [forRefresh,setRfresh]  = useState(true)
  const [selectDish,setSelectDish]  = useState({id:"",name:'',ingredients:'',create:false,update:false,active:""})
  return (
    <Grid container spacing={6} rowSpacing={2}>
      <Grid item sm={3} xs={12} className="leftbox">
        <Item className="MainLeft">
          <div className="dishBlock">
            <h3>Dishes</h3>
            <button className="button-3" onClick={()=>setSelectDish({id:"",name:'',ingredients:'',create:true,update:false,active:""})}>Create</button>
          </div>
          <LeftBar  forRefresh={forRefresh}  setSelectDish={setSelectDish} selectDish={selectDish}  />
        </Item>
      </Grid>
      <Grid item sm={8} xs={12}>
        <div className="rightBox2">
          <RightBar setRfresh={setRfresh}  selectDish={selectDish} />
        </div>
      </Grid>
    </Grid>
  );
}

export default Home;

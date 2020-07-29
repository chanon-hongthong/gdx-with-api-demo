import React, { useState, useEffect } from "react";
import "./App.css";

import { Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LoadingSpinner from "./components/Elements/LoadingSpinner";
import { TextField } from "@material-ui/core";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const URL = "https://api.egov.go.th/ws";
const VALIDATE_PATH = "auth/validate";
const LINKAGE_PATH = "dopa/linkage/v1/link";
const CONSUMER_KEY = "c8fc16ef-1cbc-44a0-8a87-5b835c6bb0b7"; //get from gdx
const AGENT_ID = "1419900053898"; //id card ของเจ้าหน้าที่ ที่เสียบบัตรอยู่
const CONSUMER_SECRET = "QJnka0itgJr"; //get from gdx
const CONTENT_TYPE = "application/x-www-form-urlencoded; charset=utf-8";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}));

function App() {
  const classes = useStyles();

  
  const [token, setToken] = useState("");
  const [citizenid, setCitizenId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchval, setSearchVal] = useState({});
  const [noClick, setNoClick] = useState(true);
  const [dialogopen, setDialogOpen] = useState(false);

  //function for step 1
  async function getToken() {
    try {
      setIsLoading(true);
      let res = "";
      const response = await fetch(
        `${URL}/${VALIDATE_PATH}?AgentID=${AGENT_ID}&ConsumerSecret=${CONSUMER_SECRET}`,
        {
          method: "GET",
          headers: {
            "Content-Type": CONTENT_TYPE,
            "Consumer-Key": CONSUMER_KEY,
          },
        }
      );
      res = await response.json();
      setIsLoading(false);
      if (res.Result) {
        //console.log("set token : ",res.Result);
        setToken(res.Result);
      }
    } catch (err) {
      console.log("error action : ", err);
    }
  }

  //function for step 2
  async function getData() {
    let res = "";
    let office_id = "00023";
    let service_id = "001";
    let version = "01";

    //console.log("Token Key : ", token);

    if (token) {
      try {
        setIsLoading(true);
        //console.log("Token Key : ", token);
        const response = await fetch(
          `${URL}/${LINKAGE_PATH}?OfficeID=${office_id}&ServiceID=${service_id}&Version=${version}&CitizenID=${citizenid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": CONTENT_TYPE,
              "Consumer-Key": CONSUMER_KEY,
              Token: token,
            },
          }
        );
        res = await response.json();
        setSearchVal(res);
        setIsLoading(false);
      } catch (error) {
        console.log("Error : ", error);
      }
    } else {
      return;
    }
  }

  useEffect(() => {
    if (token !== "") {
      getData();
    }
  }, [token]);

  const handleChange = (event) => {
    event.preventDefault();
    let text = event.target.value;
    if(text.length == 13){
      setNoClick(false);
    }else{
      setNoClick(true);
    }

    setCitizenId(text);
  };

  const handleCloseDialog =  (event) => {
    event.preventDefault();
    setToken("");
    setCitizenId("");
    setIsLoading(false);
    setIsSearch(false);
    setSearchVal({});
    setNoClick(true);
    setDialogOpen(false);
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSearch(true);
    setDialogOpen(true);
    await getToken();
  };

  return (
    <div className={classes.root}>
      {isLoading && <LoadingSpinner asOverlay />}
      <form onSubmit={handleSubmit}>
        <Grid item lg={4} md={12} xl={4} xs={12}>
          กำลังใช้งานสิทธิ์ของเจ้าหน้าที่ ID : {AGENT_ID}
        </Grid>

        <Grid item lg={4} md={12} xl={4} xs={12}>
          <TextField
            label="หมายเลขบัตรประชาชน 13 หลัก"
            value={citizenid}
            onChange={handleChange}
            margin="dense"
            variant="outlined"
            fullWidth
            error={noClick}
            onInput = {(e) =>{
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,13)
            }}
          />
        </Grid>

        <Grid item lg={4} md={12} xl={4} xs={12}>
          <Button
            variant="contained"
            color="primary"
            margin="dense"
            type="submit"
            fullWidth
            disabled={noClick}
          >
            เริ่มการสืบค้นข้อมูล
          </Button>
        </Grid>
      </form>

      { 
        !isLoading  && isSearch && 
        <Dialog
          maxWidth lg={4} md={12} xl={4} xs={12}
          open={dialogopen}
          keepMounted
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          disableBackdropClick={true}
        >
          <DialogTitle id="alert-dialog-slide-title">{"ผลลัพธ์การสืบค้นข้อมูล"}</DialogTitle>
          <DialogContent>

              <TextField
                margin="dense"
                id="fullname"
                label="ชื่อ-นามสกุล"
                type="text"
                fullWidth
                value={searchval.fullnameAndRank}
              />

              <TextField
                margin="dense"
                id="dateOfBirth"
                label="เกิดเมื่อ"
                type="text"
                value={searchval.dateOfBirth}
              />
              <TextField
                margin="dense"
                id="age"
                label="อายุ"
                type="text"
                value={searchval.age}
              />

              <TextField
                margin="dense"
                id="fatherName"
                label="ชื่อบิดา"
                type="text"
                value={searchval.fatherName}
              />

              <TextField
                margin="dense"
                id="motherName"
                label="ชื่อมารดา"
                type="text"
                value={searchval.motherName}
              />
          </DialogContent>

          <DialogActions>
            
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      }
      

    </div>
  );
}

export default App;

import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HeroScreen from "../components/heroScreen"

import { useForm } from "react-hook-form"

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import * as firebase from 'firebase';

const database = firebase.database();
const storage = firebase.storage();


const HomePage = () => { 
  const classes = useStyles();
  // Products TextField Values on State  
  const [pName, setpName] = useState("");
  const [pPrice, setpPrice] = useState("");
  const [pDesc, setpDesc] = useState("");
  //Images TextField Values on State
  const [image, setImage] = useState(null);
  
  const [errorRegister, setErrorRegister] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm({ 
    
  })

  const onInsertDataInFirestore = () => {
    if(pName === ""){
      alert("Product Name Required!");
    }else if(pPrice === ""){
      alert("Product Price Required!");
    }
    else{
      setLoading(true)
       database.ref('products').push({
          ProductName: pName,
          ProductPrice: pPrice,
          ProductDescription: pDesc,
        })
        .then(() => {
          setLoading(false)
          alert("Product Save To Database");
        })
        .catch(error => {
          setLoading(false)
          setErrorRegister(error.message)
        })
      }
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // handle Image upload in firebase Storage
  const handleUpload = () => {
    if(image === ""){
      alert("Insert Image Required!");
    }else{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            console.log(error);
          }
        );
      };
    }

  return (
    <Layout>
      <SEO title="AddProduct" />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <form className={classes.form} onSubmit={handleSubmit(onInsertDataInFirestore)}>

            <Grid container justify="center" display="center" alignItems="center">
              <Avatar style={{ width: "150px", height: "150px" }} marginRight="0px" />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="image"
                type="file"
                onChange={handleChange}
                autoFocus
                ref={register({ required: true})}
                inp
              />

              <div style={{ marginLeft: "30px" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ display: "center" }}
                  className={classes.submit}
                  onClick = {handleUpload}
                >
                  Attach a file 
                </Button>
              </div>
            </Grid>

              <TextField  
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="productName" 
                label="Product Name"
                name="pName"
                onChange={(e)=>{setpName(e.target.value)}}
                autoFocus
                ref={register({ required: true})}
                
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="pPrice"
                label="Product Price"
                placeholder = "$"
                type="decimal"
                onChange={(e)=>{setpPrice(e.target.value)}}
                id="productPrice"
                ref={register({ required: true})}
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={4}
                name="pDesc"
                label="Product Description"
                type="capSentences"
                id="productDescription"
                onChange={(e)=>{setpDesc(e.target.value)}}
                ref={register({ required: true})}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onInsertDataInFirestore}
              >
                Add a new Product
              </Button>

            <Grid container>
              <Grid item xs>

              </Grid>
              <Grid item>

              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>

        </Box>
      </Container>

    </Layout>
  )
}

export default HomePage

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
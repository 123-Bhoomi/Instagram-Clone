import React, { useState , useEffect } from 'react';
import './App.css';
import Post from './Post';
import {db, auth} from './firebase';
import Modal from '@mui/material/Modal';
import makeStyles from '@mui/styles/makeStyles';
import { Button, Input } from '@mui/material';
import ImageUpload from './ImageUpload';


function getModalStyle(){
  const top = 50;
  const left = 50;
  return{
    top : `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(() => ({
  paper:{
    // position: 'absolute',
    // width: 400,
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow:theme.shadows[5],
    // padding: theme.spacing(2,4,3),
    position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);


  useEffect(()=>{
    const unsubscribe= auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //user logged in
        console.log(authUser);
        setUser(authUser);
        }else{
        //user logged out
        setUser(null);
      }
    })
    return() =>{
      //perform some cleanup actions
      unsubscribe();
    }
  },[user, username]);

  useEffect(() => {
    //this is where code runs
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      //every time a new post is added in the firebase, this code fires...
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })

  },[])

  const signUp = (event) =>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username
      })
    }).catch((error) => alert(error.message));
    setOpen(false);
  }

  const signIn = (event) =>{
    event.preventDefault();

    auth.signInWithEmailAndPassword(email,password).catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app_signup'>
          <center>
            <img className='app_headerImage' 
            src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
          </center> 
          <Input placeholder='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app_signup'>
          <center>
            <img className='app_headerImage' 
            src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
          </center> 
          <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <div className='app_header'>
        <img className='app_headerImage' 
        src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>

        {user ? (
          <Button onClick={()=> auth.signOut()}>Logout</Button>
        ):(
          <div className='app_loginContainer'>
            <Button onClick={()=> setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={()=> setOpen(true)}>Sign Up</Button>
          </div> 
        )}
      </div>
      <div className='app_posts'>
        {
          posts.map(({id, post}) => (
            <Post key={id} postId ={id} user ={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />

          ))
        }
      </div>
    
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>Sorry you need to login to upload!!!</h3>
      )}

    </div>
  );
}

export default App;

import axios from 'axios';
import {useState, useEffect} from 'react';
import { TextField } from '@material-ui/core';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab';
import './assets.css'
import Imager from './display';
import { Link } from 'react-router-dom';

export default function AppPage(props) {
    const [item, setItem] = useState(0)
    const [input, setInput] = useState([])
    const [finalImg, setfinalImg] = useState()
    useEffect(() => {
        const url = "https://api.imgflip.com/get_memes"
        axios.get(url).then((response) => {
            const dataBase = response.data.data.memes
            setItem(dataBase)
        });
    }, [])

    let details = 0;
    let url = "";
    let meme_name = "";
    const exid = props.match.params.id

    // checking for matching id and saving it in some params
    const db = Object.values(item)
    db.forEach(element => {
        if(element.id === exid) {
            details = element.box_count
            url = element.url
            meme_name = element.name 
        }
    });

    const clickHandle=(e,number)=>{
        const t=[...input];
        t[number]=e.target.value;
        setInput(t);
    }

    const handleClick = async(e) => {
        
        e.preventDefault()
        const box=Array(details).fill("");
        for(let i=0;i<details;i++){
            box[i]={'text':input[i]}
        }

        var fields=new FormData();
        fields.append('template_id',exid);
        fields.append('username','ShreyParekh');
        fields.append('password','drawings24?');
        for(let i=0;i<details;i++){
            fields.append(`boxes[${i}][text]`,input[i]);
        }

        axios({
            method:'POST',
            url: 'https://api.imgflip.com/caption_image',
            data: fields,
            headers: {'Content-Type':'multipart/form-data'}
        })
        .then((response)=>setfinalImg(response.data.data.url))
        .catch((error)=>console.log(error));
 
    }

    return (
        <div className="template"> 
            <div className="Nav-bar"> 
            <Fab variant="extended" size="medium" color="primary" aria-label="add">
                <Link to="../../" className="Links"> Home </Link>
            </Fab>
            <Fab variant="extended" size="medium" color="primary" aria-label="add">
                <Link to="../card" className="Links"> Gallery </Link>
            </Fab>
            
            </div> 
            <div className="header"> <h3> {meme_name} </h3> </div>           
            <div className="content"> <img src={url} className="image_meme" alt={meme_name}/> 
            <div className="form">
                <form onSubmit={handleClick}>
                {Array(parseInt(details)).fill(0).map((number, index)=>(
                    <div key={index} className="form">
                        <TextField id="outlined-required" variant="outlined" label={"Box "+(index+1)} onChange={(e) => clickHandle(e, index)}  className="inputs"/>
                    </div>
                    ))}
                    <div className="sender"> 
                    <LoadingButton endIcon={<SendIcon/>} loadingPosition="end" variant="contained" type="Submit">
                        Send
                    </LoadingButton>
                    </div>
                </form>
            </div>
            </div> 

            {finalImg? <Imager imgUrl={finalImg} imgId={exid}/>:null}
        </div>
    )
}
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'  
import Paper from '@mui/material/Paper'
import Fab from '@mui/material/Fab';
import './Cards'
import './components.css'

export default function Homescreen() {
    return (
        <div className="paper">

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    width: 200,
                    height: 200,
                    padding: 5,
                    },
                }}
                >
                <Paper elevation={3}>
                <h2 className="home"> MEMIFY </h2> <br/> <br/>
                <Fab variant="extended" size="medium" color="primary" aria-label="add">
                    <Link to="/card" className="pic-button"> Gallery </Link>
                </Fab>
                </Paper>
            </Box>
        </div>
    )
}
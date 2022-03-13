import {ImageList, ImageListItem, ImageListItemBar, IconButton} from '@material-ui/core';
import InfoIcon from '@mui/icons-material/Info';
import Fab from '@mui/material/Fab';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './components.css';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

export default function Memes() {

    const baseUrl = 'https://api.imgflip.com/get_memes';

    const [post, setPost] = useState([]);
    const [offset, setOffset] = useState(0);
    // const [perPage] = useState(20);
    const [pageCount, setPageCount] = useState(0);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };


    useEffect(() => {
        axios.get(baseUrl).then((response) => {
            const content = response.data.data.memes
            const database = content.slice(offset, offset + 20)
            content? setPost(database) : console.log('f');
            setPageCount(Math.ceil(response.data.data.memes.length / 20))
        });
        }, [offset]);

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${
            size * rows
            } &fit=crop&auto=format&dpr=2 2x`,
        };
    }

return (
    <div className="Card">
        <Fab variant="extended" size="medium" color="primary" aria-label="add">
            <Link to="/" className="Links"> Home </Link>
        </Fab>
        
        <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"} />


        <ImageList sx={{ width: 500, height: 450 }} cols={5} rowHeight={121}>
            {post.map((item) => (
                <ImageListItem key={item.url} cols={item.cols || 1} rows={item.rows || 1}>
                    <img {...srcset(item.url, 100, item.rows, item.cols)} alt={item.name} loading="lazy" className="item"/>
                    <ImageListItemBar
                        title={item.name}
                        actionIcon={
                        <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${item.name}`}>
                            <Link to={`/main/${item.id}`}> <InfoIcon/> </Link>
                        </IconButton>
                        }
                    />         
                </ImageListItem> 
            ))}
        </ImageList>

    </div>
    )
}
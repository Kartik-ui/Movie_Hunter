//this component  uses the pagination component of material ui


import { ThemeProvider } from '@emotion/react';

import { createTheme, Pagination } from '@mui/material'
import React from 'react'

const darkTheme = createTheme({
    
    palette: { mode: 'dark' },
   
    
    
});

function CustomPagination({ setPage, numOfPages = 10 }) {
    
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    
}
    return (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            
        }} >
            <ThemeProvider theme={darkTheme}>
                <Pagination 
                   
                    count={numOfPages}

                    // here e.target.textContent is coming from pagination and it is giving the value of current clicked button
                    //with the help of this we are chaning the value of page 
                    onClick={(e) => handlePageChange(e.target.textContent) }
                   
                    color='primary'
                    
                />
    </ThemeProvider> 
    
    </div>
  )
}

export default CustomPagination

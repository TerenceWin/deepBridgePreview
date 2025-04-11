import React from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function Clients(){
    return(
        <div className='justify-content-center'>
            <h3 className='text-center mt-5 mb-4 dt h1'> Our Clients</h3>
            <Stack direction="horizontal" gap={5} className='justify-content-center flex flex-wrap'>
                <img src="https://sanuker.com/wp-content/uploads/2022/11/clients-sanuker-Samsonite.png" width="75" height="75"></img>
                <img src="https://sanuker.com/wp-content/uploads/2022/11/clients-sanuker-standard-chartered.png" width="75" height="75"></img>
                <img src="https://sanuker.com/wp-content/uploads/2022/11/clients-sanuker-tijn.png" width="75" height="75"></img>
                <img src="https://sanuker.com/wp-content/uploads/2022/11/clients-sanuker-timable.png" width="75" height="75"></img>
                <img src="https://sanuker.com/wp-content/uploads/2022/11/clients-sanuker-toyota-v.png" width="75" height="75"></img>
                <img src="https://sanuker.com/wp-content/uploads/2022/11/clients-sanuker-vlc-valencia.png" width="75" height="75"></img>
            </Stack>
            <div className="d-flex justify-content-center mt-4">
                <Button   variant="danger" style={{ background: "rgb(220, 124, 101)", border: "none" }}>
                    <h5 className='m-0'>See more</h5>
                </Button>
            </div>
            <br></br>
        </div>
    )
}

export default Clients;
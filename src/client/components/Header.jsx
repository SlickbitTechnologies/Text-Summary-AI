import { Grid, Paper, Typography } from "@mui/material"
import Logo from '../assets/1.png'
import Image from "./Image"

const Header = () => {

    return (
        <Grid sx={{position: 'sticky', width: '100%'}}>
            <Paper sx={{ width: '100%', padding: '4px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 0 }}>
                <Image alt="logo" src={Logo} style={{ width: 75, cursor: 'pointer' }} />
                <Typography variant="c1"><span style={{color:'red'}}>AI </span>{' Menu Generator'}</Typography>
                <Grid></Grid>
            </Paper>
        </Grid>
    )
}

export default Header;
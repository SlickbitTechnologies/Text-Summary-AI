import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography, Box } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuItems from "./MenuItems";
import MenuLoadingModal from './MenuLoadingModal';
import Dropdown from "../components/Dropdown";
import { MenuGenerateApi } from "../context/api/MenuGenerateApi";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { clearMenu } from "../context/reducers/RestaurantReducer";

const menuTypeList = [
    { id: "1", name: 'Breakfast' },
    { id: "2", name: 'Lunch' },
    { id: "3", name: 'Dinner' },
    { id: "4", name: 'All day' },
];
const cuisineList = [
    { id: "1", name: 'Indian' },
    { id: "2", name: 'Italian' },
    { id: "3", name: 'Chinese' },
    { id: "4", name: 'American' },
    { id: "5", name: 'Mexican' },
];
const excludes = [
    {
        id: 'price',
        label: "Price"
    },
    {
        id: "image",
        label: "Item image"
    },
    {
        id: 'description',
        label: "Description"
    }
]
const MenuGenerator = () => {
    const [cuisine, setCuisine] = useState('');
    const [menuType, setMenuType] = useState('');
    const [exclude, setExclude] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    
    const dispatch = useDispatch();

    const handleCheck = (e) => {
        if (menuType == '' || cuisine == '') {
            console.log(".....")
        }else{
            let index = exclude.indexOf(e.id);
            if (index === -1) {
                setExclude([...exclude, e.id])
            } else {
                setExclude(exclude.filter((item) => item !== e.id))
            }
        }
    }
    const generateMenu = async () => {
        if (menuType == '' || cuisine == '') {
            console.log(".....")
            // setShowToast({ show: true, message: `Please select your Meal type and Cuisine`, status: "error" })
        } else {
            setShowLoader(true)
            let filterMenutype = menuTypeList.find(e => e.id == menuType)
            let filterCuisine = cuisineList.find(e => e.id == cuisine)
            let obj = {
                cuisine: filterCuisine.name,
                mealtime: filterMenutype.name,
                q: new Date().getTime()
            }
            const { data, error } = await dispatch(MenuGenerateApi.endpoints.getMenu.initiate(obj))
            setShowLoader(false)
            console.log(data, error)
        }
    }
    useEffect(() =>{
        dispatch(clearMenu())
    },[])

    return (
        <Grid container style={{width: '100vw', padding: 0, margin: 0}}>
            <Grid sx={{
                borderRight: '1px solid #d7d7d7',
                background: 'white',
                height: '90vh',
                width: '20%'
            }}>
                <Grid container sx={{ padding: 2 }}>
                    <Grid container style={{ paddingTop: 40 }}>
                        <Typography variant="c5" sx={{paddingBottom: 1}}>Please select menu type*</Typography>
                        <Dropdown
                            list={menuTypeList}
                            value={menuType}
                            handleChange={(e) => {
                                setMenuType(e.target.value);
                            }}
                            valueKey="id"
                            displayKey="name"
                            label={'Menu type'}
                            width={'100%'}
                        />
                    </Grid>
                    <Grid container style={{ paddingTop: 40 }}>
                        <Typography variant="c5" sx={{paddingBottom: 1}}>Please select cuisine*</Typography>
                        <Dropdown
                            list={cuisineList}
                            value={cuisine}
                            handleChange={(e) => {
                                setCuisine(e.target.value);
                            }}
                            valueKey="id"
                            displayKey="name"
                            label={'Cuisine'}
                            width={'100%'}
                        />
                    </Grid>
                    <Grid container style={{ paddingTop: 40, display: 'flex', justifyContent: 'center' }}>
                        <Grid container>
                            <Typography variant="c3">Exclude (optional)</Typography>
                        </Grid>
                        <Grid container style={{ paddingTop: 10 }}>

                            <FormGroup>
                                {excludes.map((ex) => {
                                    return (
                                        <FormControlLabel
                                            key={ex.id}
                                            control={
                                                <Checkbox
                                                    color="custom"
                                                    checked={exclude.indexOf(ex.id) !== -1}
                                                    onChange={(e) => handleCheck(ex)}
                                                />}
                                            label={ex.label} 
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                  fontSize: '14px', // Set font size
                                                  fontFamily: 'Roboto, sans-serif', // Set font family
                                                },
                                              }}
                                        />
                                        )
                                    })
                                }

                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Grid container style={{ paddingTop: 40, display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={generateMenu} color="custom" variant="outlined" sx={{fontSize: 16, fontFamily: 'Roboto, sans-serif'}}><AutoAwesomeIcon sx={{paddingRight: 1}}/>Generate menu</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{width: '80%', height: '90vh', overflowX: 'scroll'}}>
                <MenuItems 
                    exclude={exclude}
                />
            </Box>
            {showLoader &&
                <MenuLoadingModal 
                    open={showLoader}
                    onClose={() => setShowLoader(false)}
                />
            }
        </Grid>
    )
}

export default MenuGenerator
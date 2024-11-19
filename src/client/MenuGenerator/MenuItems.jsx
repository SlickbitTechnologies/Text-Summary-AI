import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"

const MenuItems = ({exclude}) => {
    const { menu } = useSelector(state => state.restaurant)
    console.log(menu, 'slkdfjslkj')

    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (menu != undefined) {
            const groupData = Object?.groupBy(menu, ({ category }) => category);
            let group = []
            Object.keys(groupData).forEach(key => {
                group.push({
                    category: key,
                    items: groupData[key]
                })
            })
            setCategories(group)
        }

    }, [menu])
    return (

        <Grid container sx={{ padding: 1, height: 'var(--h)', overflow: 'auto'}}>
            {categories.length > 0 ?
            <>
                {categories?.map((category, index) => {
                        return (
                            <Grid container key={index} sx={{ padding: 1 }}>
                                <CategoryCard 
                                    category={category} 
                                    exclude={exclude}
                                />
                            </Grid>
                        )
                    })
                }
            </>
            :
            <Typography sx={{fontFamily: 'Roboto, sans-serif', fontSize: 20, paddingLeft: 50, paddingTop: 30}}>No data to display, Please try again...</Typography>
            }
        </Grid>
    )
}
const CategoryCard = ({ category, exclude }) => {
    return (
        <Card sx={{ width: '100%' }}>
            <CardHeader
                sx={{
                    textAlign: 'left', fontSize: 16, borderBottom: 1, borderColor: 'divider',
                    '& .MuiTypography-root': {
                        fontSize: 16,
                        fontWeight: 800,
                        fontFamily: 'Roboto, sans-serif'
                    },
                }}
                title={category.category}
            />
            <CardContent>
                {
                    category.items.map((item, index) => {
                        return (
                            <Grid container key={index} sx={{ padding: 0.5, }}>
                                <MenuItemCard 
                                    item={item} 
                                    key={index} 
                                    exclude={exclude}
                                />
                            </Grid>

                        )
                    })
                }
            </CardContent>
        </Card>
    )
}
const MenuItemCard = ({ item, exclude }) => {
    const av = useMemo(() => {
        const itemName = item.item_name.split(" ");
        if (itemName.length > 1) {
            return itemName[0].charAt(0) + itemName[1].charAt(0);
        } else {
            return itemName[0].charAt(0) + itemName[0].charAt(1);
        }
    }, [item])
    return (
        <Grid container sx={{ padding: 1, border: '1px solid #e7e7e7', borderRadius: '10px', gap: 1 }}>
            {!exclude.find(e => e == 'image') &&
            <Grid item sx={{ width: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar
                    sx={{
                        fontSize: 20,
                        width: 70,
                        height: 70,
                        backgroundColor: '#d7d7d7',
                        color: '#000',
                        fontWeight: 800,
                        borderRadius: '10px',
                        fontFamily: 'Roboto, sans-serif'
                    }} variant="c7">{av.toUpperCase()}</Avatar>
            </Grid>}
            <Grid item sx={{ width: !exclude.find(e => e == 'image') ? 'calc(100% - 90px)' : '100%' }}>
                <Grid container>
                    <Grid container sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="c3">{item.item_name}</Typography>
                        {!exclude.find(e => e == 'price') && <Typography variant="c3" sx={{paddingRight: 1}}>${item.price.toFixed(2)}</Typography>}
                    </Grid>
                    {!exclude.find(e => e == 'description') && <Grid container>
                        <Typography variant="c6" sx={{ textAlign: 'left' }}>{item.item_description}</Typography>
                    </Grid>}
                </Grid>

            </Grid>

        </Grid>
    )
}
export default MenuItems
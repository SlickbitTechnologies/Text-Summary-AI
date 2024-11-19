import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Dropdown = ({
    list,
    value,
    handleChange,
    label,
    width,
    valueKey,
    displayKey
}) => {
    return (
        <Box sx={{ minWidth: 120, width: width, border: '1px solid #00B074', borderRadius: 2 }}>
            <FormControl fullWidth size="small" variant="outlined" sx={{
                // border: 'none',
                textAlign: 'left',
                '& .MuiInputLabel-root': {
                    fontSize: '14px', // Style the label font size
                    fontWeight: 500,
                    fontFamily: 'Roboto, sans-serif'
                },
                '& .MuiInputBase-input': {
                    fontSize: '14px', // Style the input font size
                    fontFamily: 'Roboto, sans-serif'
                },
                '& .MuiFormHelperText-root': {
                    fontSize: '12px', // Style the helper text font size
                    fontFamily: 'Roboto, sans-serif'
                },
            }}>
                <InputLabel >{label}</InputLabel>
                <Select
                    value={value}
                    label={label}
                    color="custom"
                    sx={{ padding: 0 }}
                    onChange={handleChange}
                >
                    {list.length > 0 ?
                        (list.map((item, index) => {
                            return (
                                <MenuItem
                                    value={item[valueKey]}
                                    key={item[valueKey]}
                                >
                                    {item[displayKey]}
                                </MenuItem>
                            )
                        }))
                        :
                        <></>
                    }
                </Select>
            </FormControl>
        </Box>
    );
}

export default Dropdown;
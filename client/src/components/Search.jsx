import { useState, useRef } from 'react'
//library components
import { IconButton, Input, Box } from '@mui/material';
import FormControl, { useFormControl } from '@mui/material/FormControl';


export default function Search(props) {
    const { Icon, placeholder } = props;
    const [expanded, setExpanded] = useState(false);
    const searchRef = useRef("");

    function expansion(event) {
        event.preventDefault();
        setExpanded(true);
    };
    function search(event) {
        event.preventDefault();
        //replace this with search
        console.log(searchRef.current.value);
    };

    function VanishingInput() {
        const formContext = useFormControl() || {};
        formContext.onBlur = () => {
            if (!formContext.filled) {
                setExpanded(false);
            }
        };
    
        return (
            <Input placeholder={placeholder} name="search" inputRef={searchRef} autoFocus 
                sx={{color: "inherit", flexShrink: 2}}
            />
        );
    }
    
    return (
        <Box display="flex" whiteSpace="nowrap" component="form" onSubmit={search}>
            <IconButton color="inherit"
                {...(expanded)? { type: "submit" } : { type: "button", onClick: expansion } }
            >
                <Icon />
            </IconButton>
            <FormControl variant="standard" sx={{ justifyContent: 'center' }}>
                {expanded && <VanishingInput/>}
            </FormControl>
        </Box>
    )
}
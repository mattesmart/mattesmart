import { TextField } from "@mui/material"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useState } from "react"

interface ModeSelectionProps {
    onStart(settings: {
        count: number,
        tables:number[],
        mode: ("division"|"multiplication")
    }):void
}
function ModeSelection(props:ModeSelectionProps){
    let tableOptions = [2,3,4,5,6,7,8,9].map((value,index) => {
            return <MenuItem key={value} value={value}>{value}</MenuItem>
    });
    const [factors,setFactors] = useState([] as string[]);
    const [questions, setQuestions] = useState("5");
    const [mode, setMode] = useState("");
    const handleFactorsChange = (event: SelectChangeEvent<any>) => {
        setFactors(event.target.value);
    }
    const changedNumOfQuestions = (event:React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value === ""){
            setQuestions("");
            return;
        }
        if (isNaN(event.currentTarget.value as unknown as number)){
            console.log("NAN");
            return;
        }
        setQuestions(event.currentTarget.value);
    }
    const handleModeChange = (event:SelectChangeEvent<any>) => {
        setMode(event.target.value)
    }
    const handleStart = () => {
        let data = {
            count: questions as unknown as number,
            tables: factors as unknown as number[],
            mode: mode as ("division"|"multiplication")
        }
        props.onStart(data);           
    }
    return (
    <Grid container justifyContent={"center"} padding={"1rem"} paddingTop={"2rem"} rowSpacing={"1rem"} columns={2}>
    <Grid item xs={2}>
    <FormControl fullWidth >
        <InputLabel id="variantSelect">
            Räknesätt
        </InputLabel>
        <Select
            labelId="variantSelect"
            label="Räknesätt"
            id="variantSelection"
            value={mode}
            onChange={handleModeChange}
        >
        <MenuItem value="multiplication">multiplikation</MenuItem>
        <MenuItem value="division">division</MenuItem>
        </Select>
    </FormControl>
    </Grid>
    <Grid item xs={2}>
    <FormControl fullWidth >
    <InputLabel id="factorMultiSelect">
            Tabeller
        </InputLabel>
        <Select
            labelId="factorMultiSelect"
            label="Tabeller"
            id="factorSelection"
            multiple
            value={factors}
            onChange={handleFactorsChange}
        >
        {tableOptions}

        </Select>

    </FormControl>
    </Grid>
    <Grid item xs={2}>
    <TextField
        label={"antal frågor"}
        fullWidth
        onChange={changedNumOfQuestions}
        inputMode={"numeric"}
        value={questions}
    >
    </TextField>
    </Grid>
    <Grid item xs={2}>
    <Button variant="contained" fullWidth onClick={handleStart}>Börja</Button>
    </Grid>
    </Grid>
    )
}
export default ModeSelection
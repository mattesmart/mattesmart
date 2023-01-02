import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import ToggleButton from "@mui/material/ToggleButton"
import Typography from "@mui/material/Typography"
import { useState } from "react"
function NumpadButton(props:{value:number, display?:string, handleClick(event:any, value:number):void}){
    return (
        <Grid xs={1} item >
                <ToggleButton fullWidth value={props.value} size={"medium"} onClick={props.handleClick}>{props.display || props.value}</ToggleButton>
        </Grid>
    )
}
interface MathProblemProps {
    hidden:number,
    mode:("division"|"multiplication"),
    parts: number[],
    onAnswer(correct:boolean):void

}
function MathProblem(props: MathProblemProps) {
    const {parts, mode,hidden, onAnswer} = props;
    const [answer, setAnswer] = useState([] as unknown as number[]);
    const handleClick = (event:any, value:any) => {
        if (value === -1){
            let values = [...answer];
            values.pop();
            setAnswer(values);
            return;
        }
        if (value === -2){
            //submit
            if (parseInt(answer.join("")) === parts[hidden - 1]){
                onAnswer(true);
            } else {
                onAnswer(false);
            }
        setAnswer([]);
        return;
        }
        setAnswer([...answer,value]);
    }
    return (
        <Grid container justifyContent={"center"} padding={"1rem"}>
            <Grid item sm={6} alignItems="center" justifySelf={"center"} padding={"1rem"}>
                <Typography variant="h2" paddingBottom={"2rem"} textAlign="center">{hidden === 1 ? "?": parts[0]} {mode === "multiplication" ? <>&times;</>:  "/" } {hidden === 2 ? "?": parts[1]} &#61; {hidden === 3 ? "?": parts[2]}</Typography>
                <TextField label="ditt svar" fullWidth value={answer.join("")}></TextField>
            </Grid>

        <Grid item sm={6} padding={"1rem"} textAlign={"end"}>
            <Grid container spacing={1} columns={3} alignItems="center" justifySelf={"center"}>
                <NumpadButton value={1} handleClick={handleClick}/>
                <NumpadButton value={2} handleClick={handleClick}/>
                <NumpadButton value={3} handleClick={handleClick}/>
                <NumpadButton value={4} handleClick={handleClick}/>
                <NumpadButton value={5} handleClick={handleClick}/>
                <NumpadButton value={6} handleClick={handleClick}/>
                <NumpadButton value={7} handleClick={handleClick}/>
                <NumpadButton value={8} handleClick={handleClick}/>
                <NumpadButton value={9} handleClick={handleClick}/>
                <NumpadButton value={-1} display="ångra" handleClick={handleClick}/>
                <NumpadButton value={0} handleClick={handleClick}/>
                <NumpadButton value={-2} display="klar" handleClick={handleClick}/>
                </Grid>
        </Grid>
        </Grid>
    )
}
export default MathProblem
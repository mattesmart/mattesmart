import { CheckCircleOutline } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import './App.css';
import MathProblem from './components/MathProblem';
import ModeSelection from './components/ModeSelection';
function randomBetween(start:number,end:number){
  return Math.floor(Math.random() * end) + start;
}
function shuffle(array:number[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
function multiplicationProblem(table:number){
  let factor = randomBetween(1,10);
  let answer = table * factor;
  return [...shuffle([table,factor]),answer];
}
function divisionProblem(table:number){
  let factor = randomBetween(1,10);
  let answer = table * factor;
  return [answer, table, factor];  
}
function App() {
  const [config, setConfig] = useState({count:0, tables:[] as number[], results:[] as boolean[],startTime: null as unknown as number, mode:"" as ("division"|"multiplication")});
  const onStart = (data:any) => {
    setConfig({...config,...data, startTime:Date.now()});
  }
  const handleAnswer = (result:boolean) => {
    setConfig({...config, results: [...config.results, result]});
  }
  const onRestart = () => {
    setConfig({count:0,tables:[] as number[], startTime:null as unknown as number, results:[] as boolean[]} as { count: number, tables: number[], startTime: number, mode: ("division" | "multiplication"), results:boolean[]});
  }
  if (config.startTime === null) {
    return (<ModeSelection onStart={onStart}/>)
  }
  if (config.count > 0 && config.results.length == config.count){
    let duration = new Date(Date.now() - config.startTime);
    return (
      <Grid container columns={2} textAlign={"center"} padding={"1rem"}>
        <Grid item xs={1}><Typography variant='h4'>{config.results.length} / {config.count}</Typography></Grid>
        <Grid item xs={1} alignItems={'self-end'}><Typography variant='h4' style={{display:"inline"}}>{config.results.filter(element => element === true).length}</Typography><CheckCircleOutline color='success' /></Grid>
        <Grid item xs={2} paddingTop={"1rem"} paddingBottom={"1rem"}><Typography variant='h6'>{duration.getMinutes()} minuter och {duration.getSeconds()} sekunder</Typography></Grid>
        <Grid item xs={2} ><Button variant='contained' fullWidth onClick={onRestart}>Börja om</Button></Grid>
      </Grid>
    )
  }
  let tableSelection = randomBetween(1,config.tables.length) - 1;
  if (config.mode === "multiplication") {
    //define the current multiplication problem
    return(
      <>
      <Grid container columns={2} textAlign={"center"} justifyContent={"center"} >
        <Grid item xs={1}><Typography variant='h4'>{config.results.length} / {config.count}</Typography></Grid>
        <Grid item xs={1} alignItems={'self-end'}><Typography variant='h4' style={{display:"inline"}}>{config.results.filter(element => element === true).length}</Typography><CheckCircleOutline color='success' /></Grid>
      </Grid>
      <MathProblem hidden={randomBetween(1,3)} parts={multiplicationProblem(config.tables[tableSelection])} mode="multiplication" onAnswer={handleAnswer}/>
      </>
      );
    }    
    //define the current division problem
  return (
  <>
      <Grid container columns={2} textAlign={"center"} justifyContent={"center"}>
        <Grid item xs={1}><Typography variant='h4'>{config.results.length} / {config.count}</Typography></Grid>
        <Grid item xs={1} alignItems={'self-end'}><Typography variant='h4' style={{display:"inline"}}>{config.results.filter(element => element === true).length}</Typography><CheckCircleOutline color='success' /></Grid>
      </Grid>
  <MathProblem hidden={randomBetween(1,3)} parts={divisionProblem(config.tables[tableSelection])} mode="division" onAnswer={handleAnswer}/>
  </>
  )
}
export default App;

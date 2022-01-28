import React from "react";
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms'
import './SortingVisualizer.css'

const ARRAY_LENGTH = 200;

const ANIMATION_SPEED_MS = 10; 

const PRIMARY_COLOR = 'rgb(0, 140, 255)';

const SECONDARY_COLOR = 'white';

const WRONG_COLOR = 'rgb(255, 30, 0';

const CORRECT_COLOR = 'rgb(0, 189, 57)';
// 'rgb(0, 47, 255)';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [], 
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i=0; i< ARRAY_LENGTH; i++){
            array.push(randomIntFromInterval(5, 680));
        }
        this.setState({array});
    }

    mergeSort(){
        const animations = sortingAlgorithms.getMergeSortAnimations(this.state.array);

        for(let i=0;i<animations.length; i++){
            const arrayBars = document.getElementsByClassName("array-bar");
            
            const isColorChange = i%3 !==2;

            if(isColorChange){
                const [firstBarIdx, secondBarIdx]=animations[i];
                const firstBar = arrayBars[firstBarIdx].style;
                const secondBar = arrayBars[secondBarIdx].style;

                const color = i%3 ===0? SECONDARY_COLOR : PRIMARY_COLOR;

                setTimeout(()=> {
                    firstBar.backgroundColor = color;
                    secondBar.backgroundColor = color;
                }, i*ANIMATION_SPEED_MS);   
            } 
            
            else{
                setTimeout(()=>{
                    const [barIdx, newHeight] = animations[i];
                    const bar = arrayBars[barIdx].style;
                    bar.height = `${newHeight}px`;
                }, i*ANIMATION_SPEED_MS);
            }   
        }

        console.log(arraysAreEqual(this.state.array, this.state.array.slice().sort((a,b) => a-b)));
    }

    bubbleSort(){
        const animations = sortingAlgorithms.getBubbleSortAnimations(this.state.array);

        for(let i=0;i<animations.length;i++){
            const arrayBars = document.getElementsByClassName("array-bar");

            const isColorChange = i%3 !==2;

            if(isColorChange){
                const [firstBarIdx, secondBarIdx]=animations[i];
                const firstBar = arrayBars[firstBarIdx].style;
                const secondBar = arrayBars[secondBarIdx].style;

                const color = i%3 ===0? SECONDARY_COLOR : PRIMARY_COLOR;

                setTimeout(()=> {
                    firstBar.backgroundColor = color;
                    secondBar.backgroundColor = color;
                }, i*ANIMATION_SPEED_MS/10);   
            } 
            
            else{
                setTimeout(()=> {
                    const [firstBarIdx, firstBarNewHeight, secondBarIdx, secondBarNewHeight] = animations[i];
                    const firstBar = arrayBars[firstBarIdx].style;
                    const secondBar = arrayBars[secondBarIdx].style;
                    firstBar.height = `${firstBarNewHeight}px`;
                    secondBar.height = `${secondBarNewHeight}px`;
                }, i*ANIMATION_SPEED_MS/10);
            }
        }

        console.log(arraysAreEqual(this.state.array, this.state.array.slice().sort((a,b) => a-b)));
    }
    
    selectionSort(){
        // sortingAlgorithms.getSelectionSortAnimations(this.state.array);
        // console.log(arraysAreEqual(this.state.array, this.state.array.slice().sort((a,b) => a-b)));
        const animations = sortingAlgorithms.getSelectionSortAnimations(this.state.array);
        
        for(let i=0;i<animations.length;i++){
            const arrayBars = document.getElementsByClassName("array-bar");
            const command = animations[i]
            if(command[0] ==='selectFirst'){
                setTimeout(()=> {
                    const bar = arrayBars[command[1]].style;
                    bar.backgroundColor = WRONG_COLOR;
                }, i*ANIMATION_SPEED_MS/10);
            }
            else if(command[0]==='findMin'){
                setTimeout(()=> {
                    const bar = arrayBars[command[1]].style;
                    bar.backgroundColor = 'rgb(255, 145, 0)';
                }, i*ANIMATION_SPEED_MS/10);
            }
            else if(command[0]==='reverseColor'){
                setTimeout(()=> {
                    const bar = arrayBars[command[1]].style;
                    bar.backgroundColor = PRIMARY_COLOR;
                }, i*ANIMATION_SPEED_MS/10);
            }
            else if(command[0]==='minSoFar'){
                setTimeout(()=> {
                    const bar = arrayBars[command[1]].style;
                    bar.backgroundColor = CORRECT_COLOR;
                }, i*ANIMATION_SPEED_MS/10);
            }
            else if(command[0]==='heightChange'){
                setTimeout(()=> {
                    const [firstBarIdx, firstBarNewHeight, secondBarIdx, secondBarNewHeight] = [animations[i][1], animations[i][2], animations[i][3], animations[i][4]];
                    const firstBar = arrayBars[firstBarIdx].style;
                    const secondBar = arrayBars[secondBarIdx].style;
                    firstBar.height = `${firstBarNewHeight}px`;
                    secondBar.height = `${secondBarNewHeight}px`;
                }, i*ANIMATION_SPEED_MS/10);
            }
            else if(command[0]==='colorChange'){
                
                setTimeout(()=> {
                    const [firstBarIdx, secondBarIdx] = [animations[i][1], animations[i][2]];
                    const firstBar = arrayBars[firstBarIdx].style;
                    const secondBar = arrayBars[secondBarIdx].style;
                    firstBar.backgroundColor = PRIMARY_COLOR;
                    // CORRECT_COLOR;
                    // secondBar.backgroundColor = PRIMARY_COLOR;
                }, i*ANIMATION_SPEED_MS/10);
            }
        }
    }

    render() {
        const {array} = this.state;
    
        return (
          <div className="array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{height: `${value}px`}}></div>
            ))} 

            <div>
                <button id='reset' onClick={()=> this.resetArray()}>Generate New Array</button>
                <button onClick={()=> this.mergeSort()}>Merge Sort</button>
                <button onClick={()=> this.selectionSort()}>Selection Sort</button>
                <button onClick={()=> this.heapSort()}>Heap Sort</button>
                <button onClick={()=> this.bubbleSort()}>Bubble Sort</button>
                {/* <button onClick={()=> this.testSortingAlgorithms()}>Test Sorting Algorithms</button> */}
                
                {/* <select id="sorting-algorithm">
                    <option value="null" >Select Algorithm</option>
                    <option onSelect={() => this.mergeSort(this.array)} value="merge-sort">Merge Sort</option>
                    <option value="teamwork">Team Work</option>
                    <option value="technical">Technical</option>
                </select> */}
            </div>
        
          </div>
        );
    }
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(firstArray, secondArray){
    if (firstArray.length !== secondArray.length) return false;
    for(let i=0; i<firstArray.length; i++){
        if(firstArray[i] !== secondArray[i]) return false;
    }
    return true;
}
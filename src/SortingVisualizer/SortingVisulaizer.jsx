import React from "react";
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms'
import './SortingVisualizer.css'

const ARRAY_LENGTH = 200;

const ANIMATION_SPEED_MS = 5; 

const PRIMARY_COLOR = 'rgb(0, 140, 255)';

const SECONDARY_COLOR = 'red';

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
    }

    quickSort(){
        
    }

    heapSort(){
    }

    bubbleSort(){

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
                <button onClick={()=> this.resetArray()}>Generate New Array</button>
                <button onClick={()=> this.mergeSort()}>Merge Sort</button>
                <button onClick={()=> this.quickSort()}>Quick Sort</button>
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
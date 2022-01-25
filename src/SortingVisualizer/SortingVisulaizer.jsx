import React from "react";
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms'
import './SortingVisualizer.css'

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
        for(let i=0; i< 200;i++){
            array.push(randomIntFromInterval(5, 680));
        }
        this.setState({array});
    }

    mergeSort(){
        const javaSriptSortedArray = this.state.array.slice().sort((a,b) => a-b);
        const sortedArray = sortingAlgorithms.mergeSort(this.state.array);
        // console.log(arraysAreEqual(javaSriptSortedArray , sortedArray));
    }

    quickSort(){
        
    }

    heapSort(){
    }

    bubbleSort(){
        const javaSriptSortedArray = this.state.array.slice().sort((a,b) => a-b);
        const sortedArray = sortingAlgorithms.bubbleSort(this.state.array);
        console.log(arraysAreEqual(javaSriptSortedArray , sortedArray));
    }
    
    testSortingAlgorithms(){
        for(let i=0; i<100; i++){
            const array = [];
            const len = randomIntFromInterval(1,1000);
            
            for(let i=0; i<len; i++){
                array.push(randomIntFromInterval(-1000,1000));
            }

            const javaScriptSortedArray = array.slice().sort((a, b) => a-b);
            const mergeSortedArray = sortingAlgorithms.mergeSort(array.slice());
            console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
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
                <button onClick={()=> this.resetArray()}>Generate New Array</button>
                <button onClick={()=> this.mergeSort()}>Merge Sort</button>
                <button onClick={()=> this.quickSort()}>Quick Sort</button>
                <button onClick={()=> this.heapSort()}>Heap Sort</button>
                <button onClick={()=> this.bubbleSort()}>Bubble Sort</button>
                <button onClick={()=> this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
                
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
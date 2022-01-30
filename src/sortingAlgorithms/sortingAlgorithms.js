export function getMergeSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;

    const auxiliary = array.slice();
    mergeSortHelper(array, 0, array.length-1, auxiliary, animations);
    
    return animations;
}

function mergeSortHelper(array, start, end, auxiliary, animations,) {
    if(start===end) return;

    const mid = Math.floor((start+end)/2);
    mergeSortHelper(auxiliary, start, mid, array, animations);
    mergeSortHelper(auxiliary, mid+1, end, array, animations);
    merge(array, start, mid, end, auxiliary, animations);
}

function merge(array, start, mid, end, auxiliary, animations,){
    let k=start, i=start, j=mid+1;

    while(i<=mid && j<=end){

        //selecting the comparison values
        animations.push([i,j]);

        //un-selecting the selected values
        animations.push([i, j]);

        //sorting
        if(auxiliary[i]<=auxiliary[j]){

            //overwriting the main array with the sorted value
            //changing its height to aux[i]
            animations.push([k, auxiliary[i]]);
            array[k++]=auxiliary[i++];
        } 
        
        else{
            animations.push([k, auxiliary[j]]);
            array[k++]=auxiliary[j++];
        }
    }

    while(i<=mid){
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliary[i]]);
        array[k++]=auxiliary[i++];
    }
    
    while(j<=end){
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliary[j]]);
        array[k++]=auxiliary[j++];
    }
}




export function getBubbleSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSortHelper(array, animations);
    return animations;
}

function bubbleSortHelper(array, animations){

    const len = array.length;

    for(let i=0; i<len;i++){
        let noSwapsOccured = false;

        for(let j=0; j<len-i-1;j++){
            animations.push([j,j+1]);
            animations.push([j,j+1]);

            if(array[j]<=array[j+1]){
                animations.push([j, array[j], j+1, array[j+1]]);
            }

            if(array[j]>array[j+1]){
                noSwapsOccured=true;
                animations.push([j, array[j+1], j+1, array[j]]);
                const temp = array[j+1];
                array[j+1]=array[j];
                array[j]=temp;
            }
        }

        if(!noSwapsOccured){
            return;
        }
    }
}





export function getSelectionSortAnimations(array){
    const animations = [];
    if(array.length<=1) return array;
    selectionSortHelper(array, animations);
    return animations;
}

function selectionSortHelper(array, animations){
    const len = array.length

    for(let i=0;i<len;i++){
        animations.push(['selectFirst',i]);
        let minSoFar = i;
        for(let j=i+1;j<len;j++){
            if(array[minSoFar]>array[j]){
                minSoFar=j;
            }
            animations.push(['findMin', j]);
            animations.push(['reverseColor', j]);
        }
        animations.push(['minSoFar', minSoFar]);
        animations.push(['reverseColor', minSoFar]);
        animations.push(['heightChange', minSoFar, array[i], i, array[minSoFar]]);
        animations.push(['colorChange', i, minSoFar]);

        const temp = array[i];
        array[i]=array[minSoFar];
        array[minSoFar]=temp;
    }
}




export function getQuickSortAnimations(array){
    const animations = [];
    if(array.length<=1) return;
    quickSort(array, 0, array.length-1, animations);
    return animations;
}

function quickSort(array, left, right, animations){
    if(left<right){
        let partitionIndex = partition(array, left, right, animations);
        quickSort(array, left, partitionIndex-1, animations);
        quickSort(array, partitionIndex+1, right, animations);
    }
    return;
}

function partition(array, left, right, animations){
    let pivot = array[right];

    animations.push(['pivot', right])
    
    var idx= left-1;

    for(let i=left;i<right;i++){
        animations.push(['increments', i]);
        animations.push(['increments', i]);
        if(array[i]<pivot){  

            idx++;
            
            animations.push(['swap', idx, array[i], i, array[idx]]);
            swap(array, idx, i);
        }
    }
    animations.push(['swap', idx+1, array[right], right, array[idx+1]]);
    swap(array, idx+1, right); 
    animations.push(['unpivot',right]);
    return idx+1;
}

function swap(array, a, b){
    const temp = array[b];
    array[b]=array[a];
    array[a]=temp;
}
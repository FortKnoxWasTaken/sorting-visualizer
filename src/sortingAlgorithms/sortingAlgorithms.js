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

export const mergeSort = array => {
    if (array.length === 1) return array;
    
    const mid = Math.floor(array.length/2);
    const left = mergeSort(array.slice(0, mid));
    const right = mergeSort(array.slice(mid));

    const sorted = [];

    let i=0, j=0;

    while(i<left.length && j<right.length){
        if (left[i]<right[j]){
            sorted.push(left[i++]);
        } else{
            sorted.push(right[j++])
        }
    }

    while (i<left.length) sorted.push(left[i++]);
    while (j<right.length) sorted.push(right[j++]);
    return sorted; 
};

// export const bubbleSort = array => {
//     var i, j ,temp;
//     for(i=0;i<array.length;i++){
//         for(j=0;j<array.length-i-1;j++){
//             if(array[j]>array[j+1]){
//                 temp = array[j+1];
//                 array[j+1] = array[j];
//                 array[j]=temp;
//             }
//         }
//     }
//     return array;
// };
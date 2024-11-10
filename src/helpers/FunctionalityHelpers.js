export class FunctionalityHelpers{
    static GetGeneratedNumberSucessSequences(randomNumbers){
        let PossibleSequences=[]
        let ArrayChunks=this.SplitArrayIntoChunks(randomNumbers,5)

         //Another logic used without chunks
        function DiagonalValues(randomNumbers){
            
           
            function diagonal_1(){
                let diag_1=[]
                for(let i=0;i<randomNumbers.length;i++){
                    if(i===0){
                        diag_1=[...diag_1,randomNumbers[i]]
                    }
                    else if(i%6==0){
                        diag_1=[...diag_1,randomNumbers[i]]
                    }
                }
                
                return diag_1
            }

            function diagonal_2(){
                let diag_2=[]
                for(let i=0;i<randomNumbers.length;i++){
                     if(i!==0 && i<=20 && i%4===0){
                        diag_2=[...diag_2,randomNumbers[i]]
                    }
                }
                return diag_2
            }
            
            let diagonal_1_numbers=diagonal_1()
            let diagonal_2_numbers=diagonal_2()
            PossibleSequences=[...PossibleSequences,[...diagonal_1_numbers],[...diagonal_2_numbers]]
        }

        //Another logic used without chunks

        function HorizontalValues(randomNumbers){

            let PossibleHorizontalValues=[]
            let TempList=[]
            for(let i=0;i<randomNumbers.length;i++){
                if((i+1)%5==0){
                    PossibleHorizontalValues=[...PossibleHorizontalValues,[...TempList,randomNumbers[i]]]
                    TempList=[]
                }else{
                    TempList=[...TempList,randomNumbers[i]]
                }
            }
            PossibleSequences=[...PossibleSequences,...PossibleHorizontalValues]
        }

        //Used array chunk logics
        function VerticalValues(arrayChunks){
            let PossibleVerticalValues=[]
            for(let i=0;i<arrayChunks.length;i++){
                let TempList=[]
                for(let j=0;j<arrayChunks.length;j++){
                    TempList.push(arrayChunks[j][i])
                }
                PossibleVerticalValues.push(TempList)
            }
            PossibleSequences=[...PossibleSequences,...PossibleVerticalValues]
        }
        
        DiagonalValues(randomNumbers)
        HorizontalValues(randomNumbers)
        VerticalValues(ArrayChunks)
        return PossibleSequences
    }

    static SplitArrayIntoChunks(array,size){
        const chunks = [];
            for (let i = 0; i < array.length; i += size) {
                chunks.push(array.slice(i, i + size));
            }
      return chunks
    }

    static CheckWinSequenceBySelectedItem(existingSelectedWinSequences,GeneratedWinSequences,selectedValues){
        // console.log(existingSelectedWinSequences.some(subArray => subArray.every((val, index) => console.log(val))),'1')
        let filterOutSelectedWin=GeneratedWinSequences.filter((item)=>!existingSelectedWinSequences.some(subArray => subArray.toString()==item.toString()))
        // console.log(filterOutSelectedWin,'2')
        let filterOutGeneratedWinNumbers=filterOutSelectedWin.filter((item)=>item.every((values)=>selectedValues.includes(values)))
        // console.log(filterOutGeneratedWinNumbers,'3')
        return filterOutGeneratedWinNumbers.length>0? [...existingSelectedWinSequences,[...filterOutGeneratedWinNumbers]]:[...existingSelectedWinSequences]

    }

    static MergeArrays(array){
        let MergeArray=[]
        array.forEach((item)=>{
            item.forEach((val)=>{
                MergeArray=[...MergeArray,...val]
            })
        })
        return MergeArray
    }
}